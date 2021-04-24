import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <div className="center column">
            <h1>Log In</h1>
            {error && <h1>{error}</h1>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef}></input>
                <label>Password</label>
                <input type="password" ref={passwordRef}></input>
                <button disabled={loading}>Log In</button>
                <label>Register for an account! <Link to="/signup">Sign Up </Link></label>
            </form>
        </div>
    );
}

export default Login;