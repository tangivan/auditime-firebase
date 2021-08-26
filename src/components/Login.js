import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import firebase from '../firebase'
import { Link, useHistory } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, anonLogin, loginWithGoogle } = useAuth();
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

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        console.log("google login")
        try {
            setError("");
            setLoading(true);
            await loginWithGoogle();
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
            <form className="form">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input"></input>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} className="input"></input>
                    {error && <h1>{error}</h1>}
                    <button disabled={loading} className="btn cursor" onClick={handleSubmit}>Sign In</button>
                    <button className="btn  cursor" onClick={handleAnonLogin}> Continue as Guest</button>
                </div>
                <div className="row space-between margin-btm-sm">
                    <label>Register for an account! <Link to="/signup">Sign Up </Link></label>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div>
                    <h2><span>Or</span></h2>
                    <button className="google-btn cursor" onClick={handleLoginWithGoogle}>
                        <span className="btn-icon"><FcGoogle size={22} /></span>
                        <span className="btn-span">Sign in with Google</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;