import React, { useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from '../firebase'
import firebase from 'firebase/app';
import 'firebase/auth'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const anonLogin = () => {
        return auth.signInAnonymously();
    }

    const loginWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const user = result.user;
            })
            .catch(error => {
                console.log(error);
            })

    }

    const linkEmailandPassword = (email, password, displayName) => {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        auth.currentUser.linkWithCredential(credential)
            .then((usercred) => {
                const user = usercred.user;
                user.updateProfile({ displayName: displayName });
            }).catch((error) => {
                console.log("Error upgrading anonymous account", error);
            });
    }

    const linkWithGoogle = () => {
        auth.currentUser.linkWithPopup(googleProvider)
            .then(() => {
                window.location.reload(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    }

    const updateName = (user, fname, lname) => {
        console.log("this method was fired");
        return user.updateProfile({
            displayName: fname + ' ' + lname
        }).then(console.log("succeed"));
    }

    const getUuid = () => {
        return currentUser.uid;
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        getUuid,
        updateName,
        anonLogin,
        loginWithGoogle,
        linkWithGoogle,
        linkEmailandPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;