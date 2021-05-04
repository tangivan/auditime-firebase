import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions')
        } catch {
            setError("Failed to reset password.");
        }

        setLoading(false);
    }

    return (
        <div className="center column">
            <h1>Reset Password</h1>
            {error && <h1>{error}</h1>}
            <h1>{message}</h1>
            <form className="column" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef}></input>
                <button disabled={loading}>Submit</button>
                <label><Link to="/login">Login</Link></label>
            </form>
            <label>Create a new account? <Link to="/Signup">Signup</Link></label>
        </div>
    );
}

export default ForgotPassword;