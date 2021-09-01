import ToggleableTimerForm from "./ToggleableTimerForm";
import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners'
import TimerController from "./TimerController";
import firebase from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const TimerList = () => {
    const [timerList, setTimerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getUuid } = useAuth();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(getUuid())
            .collection('timers')
            .onSnapshot((snapshot) => {
                const newTimers = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                newTimers.sort(function (x, y) {
                    return x.timerHistory[0].timeStamp - y.timerHistory[0].timeStamp;
                })
                setTimerList(newTimers);
                setLoading(false);
            })
        return () => unsubscribe();
    }, [])

    return (
        <>
            {loading ? <div className="loader"><BeatLoader size={60} /></div> :
                <div className="timerlist column">
                    <ul className="row timerGrid">
                        {timerList.map(timer => {
                            return (<TimerController timer={timer} key={timer.id} />)
                        })}
                        <ToggleableTimerForm />
                    </ul>
                </div>
            }
        </>
    );
}

export default TimerList;