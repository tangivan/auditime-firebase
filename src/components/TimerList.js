import ToggleableTimerForm from "./ToggleableTimerForm";
import React, { useState, useEffect, useContext } from 'react';
import TimerController from "./TimerController";
import firebase from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid';

const TimerList = () => {
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
                setTimerList(newTimers);
            })
        return () => unsubscribe();
    }, [])

    return (
        <div className="timerlist column">
            <ul className="row timerGrid">
                {timerList.map(timer => {
                    return (<TimerController timer={timer} key={timer.id} />)
                })}
                <ToggleableTimerForm />
            </ul>
        </div>
    );
}

export default TimerList;