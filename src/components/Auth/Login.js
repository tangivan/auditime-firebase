import React, { useRef, useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { useAuth } from '../../context/AuthContext'
import { addDefaultTimer } from '../../utils/firebaseHelper'
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
            setError("You may now sign in from the Google Sign-in Popup.");
            await loginWithGoogle();
        } catch (error) {
            setError("Failed to log in");
        }
    }

    const handleAnonLogin = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await anonLogin().then(cred => {
                addDefaultTimer(cred.user.uid)
            })
        } catch (error) {
            setError("Failed to login anonymously.");
        }
    }

    return (
        <>
            {loading ? <div data-testid="loader" className="loader"><BeatLoader size={60} /></div> :
                <div data-testid="header" className="auth-form-outer">
                    <h2 className="header">Log In</h2>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" ref={emailRef} className="input" required></input>
                            <label htmlFor="pass">Password</label>
                            <input id="pass" type="password" htmlFor="pass" ref={passwordRef} className="input" required></input>
                            {error && <h1 className="text-center-red">{error}</h1>}
                            <button data-testid="login" disabled={loading} className="btn cursor" onClick={handleSubmit}>Sign In</button>
                            <button className="btn cursor" onClick={handleAnonLogin}> Continue as Guest</button>
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