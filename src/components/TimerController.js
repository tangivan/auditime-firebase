import React, { useState, useEffect, useContext } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { MdCancel, MdModeEdit } from "react-icons/md";
import Timer from './Timer';
import TimerForm from './TimerForm';
import firebase from '../firebase'

const TimerController = ({ timer }) => {
    const [timerSettings, setTimerSettings] = useState({
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        savedTime: 0,
        timerReset: false,
    })

    const [timeShown, setTimeShown] = useState({
        centiseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
    })

    const [editTimer, setEditTimer] = useState(false);

    useEffect(() => {
        setTimerSettings({
            ...timerSettings,
            timerTime: timer.timeShown
        })
    }, [])

    useEffect(() => {
        let interval = null;

        if (timerSettings.timerOn) {
            interval = setInterval(() => {
                setTimerSettings({
                    ...timerSettings,
                    timerTime: Date.now() - timerSettings.timerStart
                })
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timerSettings.timerOn])

    useEffect(() => {
        let centiseconds = (Math.floor(timerSettings.timerTime / 10) % 100)
        let seconds = ("0" + (Math.floor(timerSettings.timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerSettings.timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerSettings.timerTime / 3600000)).slice(-2);

        setTimeShown({
            centiseconds,
            seconds,
            minutes,
            hours
        })
    }, [timerSettings.timerTime])



    const handleStart = () => {
        setTimerSettings({
            ...timerSettings,
            timerOn: true,
            savedTime: timerSettings.timerTime,
            timerStart: Date.now() - timerSettings.timerTime
        })
        const newHistory = [...timer.timerHistory, {
            events: 'start',
            duration: timerSettings.timerTime,
            timeStamp: Date.now()
        }]
        firebase.firestore().collection('timers').doc(timer.id).update({ timerHistory: newHistory });
    }

    const handlePause = () => {
        setTimerSettings({
            ...timerSettings,
            timerOn: false
        })

        const newHistory = [...timer.timerHistory, {
            events: 'pause',
            duration: timerSettings.timerTime - timerSettings.savedTime,
            timeStamp: Date.now()
        }]

        const newTimeRunTotal = timer.timeRunTotal === timer.timeShown ? timerSettings.timerTime : (timer.timeRunTotal + timerSettings.timerTime);

        firebase.firestore().collection('timers').doc(timer.id).update({ timeShown: timerSettings.timerTime, timeRunTotal: newTimeRunTotal, timerHistory: newHistory });
    }

    const handleReset = () => {
        setTimerSettings({
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            timerReset: true
        })

        const newHistory = [...timer.timerHistory, {
            events: 'reset',
            timeStamp: Date.now()
        }]
        firebase.firestore().collection('timers').doc(timer.id).update({ timeShown: 0, timerHistory: newHistory });

    }

    const handleRemoveTimer = () => {
        firebase.firestore().collection('timers').doc(timer.id).delete().
            then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const handleEditTimer = () => {
        editTimer ? setEditTimer(false) : setEditTimer(true);
    }
    return (
        <div className="timer-container column align-center">
            {editTimer && (<TimerForm handleToggleClick={handleEditTimer} timer={timer} />)}
            <div className="label-container">
                <label className='labels'>{timer.name}</label>
                <button className='editable-btn'
                    onClick={handleEditTimer}
                >
                    <MdModeEdit size={20} color="#0755B5" />
                </button>
            </div>
            <div className='delete-btn-container'>
                <button className='column align-center delete-timer-btn'
                    onClick={handleRemoveTimer}
                >
                    <MdCancel color="#0755B5" size={30} />
                </button>
            </div>

            <Timer time={timeShown} />

            <div className='row end'>
                {!timerSettings.timerOn &&
                    (<button className='time-btn'
                        onClick={handleStart}>
                        <FaPlay color='#DEEDFE' size={20} />
                    </button>)}
                {timerSettings.timerOn && (<button className='time-btn'
                    onClick={handlePause}>
                    <FaPause color='#DEEDFE' size={20} />
                </button>)}

                <button className='time-btn' onClick={handleReset}>
                    <FaStop color='#DEEDFE' size={20} />
                </button>
            </div>
        </div>
    );
}

export default TimerController;