import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const fb = firebase.initializeApp({
    apiKey: "AIzaSyB753PB3GX0-qi_jOldgbFSrSJ76wcUZ2o",
    authDomain: "auditime-hooks.firebaseapp.com",
    projectId: "auditime-hooks",
    storageBucket: "auditime-hooks.appspot.com",
    messagingSenderId: "357613794026",
    appId: "1:357613794026:web:476139857b64c287a91d93"
})

// var firebaseConfig = {
//     apiKey: "AIzaSyB753PB3GX0-qi_jOldgbFSrSJ76wcUZ2o",
//     authDomain: "auditime-hooks.firebaseapp.com",
//     projectId: "auditime-hooks",
//     storageBucket: "auditime-hooks.appspot.com",
//     messagingSenderId: "357613794026",
//     appId: "1:357613794026:web:476139857b64c287a91d93"
// }

// firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();

export default fb;