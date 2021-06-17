import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import firebase from '../firebase'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, anonLogin, logout } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
        history.push("/");
    }

    const handleAnonLogin = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await anonLogin().then(cred => {
                console.log(cred);
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
            setError("Failed to login anonymously.");
        }
        history.push("/");
        setLoading(false);
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Log In</h2>
            {error && <h1>{error}</h1>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input"></input>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} className="input"></input>
                    {error && <h1>{error}</h1>}
                    <button disabled={loading} className="btn cursor">Sign In</button>
                    <button className="btn  cursor" onClick={handleAnonLogin}> Continue as Guest</button>
                </div>
                <label>Register for an account! <Link to="/signup">Sign Up </Link></label>
                <Link to="/forgot-password">Forgot Password?</Link>
            </form>
        </div>
    );
}

export default Login;