import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import ToggleableTimeData from './ToggleableTimeData';
import { v4 as uuidv4 } from 'uuid';

const TimerData = () => {
    const [timerList, setTimerList] = useState([]);
    const { getUuid } = useAuth();


    useEffect(() => {
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
            })
        return () => unsubscribe();
    }, [])

    return (
        <div className="timerDataTable">
            <table className="timerTable">
                <tbody>
                    <tr>
                        <th>Timer Name</th>
                        <th>Events</th>
                        <th>Date Started</th>
                        <th>Time Started</th>
                        <th>Total Time</th>
                        <th>Session Time</th>
                        <th>Time Shown</th>
                    </tr>
                </tbody>
                {timerList.map(timer => {
                    return (
                        <ToggleableTimeData timer={timer} key={timer.id} />
                    )
                })}
            </table>
        </div>
    );
}

export default TimerData;