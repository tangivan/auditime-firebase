import React, { useContext, useState, useEffect } from 'react'
import firebase, { auth, githubProvider, googleProvider, facebookProvider, twitterProvider } from '../firebase'

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
        linkWithGoogle,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;