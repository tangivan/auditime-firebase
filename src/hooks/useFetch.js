import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import firebase from '../firebase'

const useFetch = () => {
    const [timerData, setTimerData] = useState({
        error: null,
        loading: true,
        timerList: []
    });
    const { getUuid } = useAuth();
    const uuid = getUuid();
    // eslint-disable-next-line
    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(uuid)
            .collection('timers')
            .onSnapshot((snapshot) => {
                const newTimers = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                newTimers.sort(function (x, y) {
                    return x.timerHistory[0].timeStamp - y.timerHistory[0].timeStamp;
                })
                setTimerData({
                    error: null,
                    loading: false,
                    timerList: newTimers
                })
            })
    }, [uuid])
    return timerData;
}

export default useFetch;