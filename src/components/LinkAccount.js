import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaTwitter, FaGithub, FaGit } from 'react-icons/fa'

const LinkAccount = () => {
    const emailRef = useRef();
    const history = useHistory();
    const { currentUser, linkWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser.isAnonymous)
            history.push('/');
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError("");
            setLoading(true);
            setMessage('Successfully Linked.')
        } catch {
            setError("Failed to Link account.");
        }

        setLoading(false);
    }

    const linkGoogle = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await linkWithGoogle();
        } catch (error) {
            setError('Failed to Link Account');
            console.log(error);
        }
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Link Account</h2>
            {error && <h1>{error}</h1>}
            <h1>{message}</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input"></input>
                    <button disabled={loading} className="cursor btn">Submit</button>
                    <button className="google-btn cursor" onClick={linkGoogle}>
                        <span className="btn-icon"><FcGoogle size={22} /></span>
                        <span className="btn-span">Link Google Account</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LinkAccount;