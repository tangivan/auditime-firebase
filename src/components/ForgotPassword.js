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
        <div className="auth-form-outer">
            <h2 className="header">Reset Password</h2>
            <h1>{message}</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input"></input>
                    <button disabled={loading} className="btn cursor">Submit</button>
                </div>
                {error && <h1 className="text-center-red">{error}</h1>}
                <div className="row space-between">
                    <label>Register for an account! <Link to="/signup">Sign Up </Link></label>
                    <label><Link to="/login">Login</Link></label>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;