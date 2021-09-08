import firebase from '../firebase'

export const addDefaultTimer = (userID) => {

    return firebase.firestore().collection('users').doc(userID).collection('timers').add({
        name: "Default Timer",
        timeShown: 0,
        timeRunTotal: 0,
        timerHistory: [{
            events: 'created',
            duration: 0,
            timeStamp: Date.now()
        }],
    })
}

export const addNewTimer = (name, userId) => {
    return firebase.firestore().collection('users').doc(userId).collection('timers').add({
        name,
        timeShown: 0,
        timeRunTotal: 0,
        timerHistory: [{
            events: 'created',
            duration: 0,
            timeStamp: Date.now()
        }],
    })
}

export const updateName = (name, userId, timerId) => {
    return firebase.firestore().collection('users').doc(userId).collection('timers').doc(timerId).update({ name });
}