import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
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
            await anonLogin();
        } catch {
            setError("Failed to log in");
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
                    <button disabled={loading} className="cursor">Sign In</button>
                    <button className="cursor" onClick={handleAnonLogin}> Continue as Guest</button>
                </div>
                <label>Register for an account! <Link to="/signup">Sign Up </Link></label>
            </form>
        </div>
    );
}

export default Login;