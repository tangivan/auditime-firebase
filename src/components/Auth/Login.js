import React, { useRef, useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { useAuth } from '../../contexts/AuthContext'
import firebase from '../../firebase'
import { Link, useHistory } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, anonLogin, loginWithGoogle, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(false);
            history.push("/");
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(true);
        } catch {
            setError("Failed to log in");
        }
    }

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await loginWithGoogle();
        } catch (error) {
            setError("Failed to log in");
            alert(error.message);
        }
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
    }

    return (
        <>
            {loading ? <div className="loader"><BeatLoader size={60} /></div> :
                <div className="auth-form-outer">
                    <h2 className="header">Log In</h2>
                    <form className="form">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" ref={emailRef} className="input" required></input>
                            <label>Password</label>
                            <input type="password" ref={passwordRef} className="input" required></input>
                            {error && <h1 className="text-center-red">{error}</h1>}
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
            }
        </>
    );
}

export default Login;