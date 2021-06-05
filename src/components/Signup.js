import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import firebase from '../firebase'
import { Link, useHistory } from 'react-router-dom'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, updateName } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
                console.log(cred);
                updateName(cred.user, fnameRef.current.value, lnameRef.current.value);
                return firebase.firestore().collection('users').doc(cred.user.uid).collection('timers').add({
                    name: "Default Timer",
                    timeShown: 0,
                    timeRunTotal: 0,
                    timerHistory: [{
                        events: 'created',
                        duration: 0,
                        timeStamp: Date.now()
                    }],
                })
            })
        } catch (error) {
            console.log(error);
            setError("Failed to create an account");
        }
        setLoading(false);
        history.push('/');
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Create an Account</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" ref={fnameRef} className="input"></input>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" ref={lnameRef} className="input"></input>
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input"></input>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} className="input"></input>
                    <label>Password Confirmation</label>
                    <input type="password" ref={passwordConfirmRef} className="input"></input>
                </div>
                {error && <h1 className="text-center">{error}</h1>}
                <button className="cursor" disabled={loading}>Sign up</button>
                <label className="login-label">Already have an account? <Link to="/login"> Log In </Link></label>
            </form>
        </div>
    );
}

export default SignUp;