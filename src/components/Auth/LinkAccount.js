import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const LinkAccount = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();
    const { currentUser, linkWithGoogle, linkEmailandPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser.isAnonymous)
            history.push('/');
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            setMessage('');
            setError("");
            setLoading(true);
            emailRef.current.value = ("");
            passwordRef.current.value = ("");
            userNameRef.current.value = ("");
            passwordConfirmRef.current.value = ("");
            await linkEmailandPassword(emailRef.current.value, passwordRef.current.value, userNameRef.current.value);
            setMessage('Successfully Linked.')
        } catch (err) {
            setError("Failed to Link account.");
        }
        setLoading(false);
    }

    const linkGoogle = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setMessage('You may now link your google account from the pop-up.')
            await linkWithGoogle();
        } catch (error) {
            setError("Failed to link accounts");
        }
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Link Account</h2>
            <span className="text-center"><h2 className="text-center-blue" data-testid="message">{message}</h2></span>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={userNameRef} className="input" required></input>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" ref={emailRef} className="input" required></input>
                    <label htmlFor="pass">Password</label>
                    <input id="pass" type="password" ref={passwordRef} className="input" required></input>
                    <label htmlFor="passconfirm">Password Confirmation</label>
                    <input id="passconfirm" type="password" ref={passwordConfirmRef} className="input" required></input>
                    {error && <h1 className="text-center-red">{error}</h1>}
                    <button disabled={loading} className="cursor btn margin-btm-sm">Submit</button>
                    <div>
                        <h2><span>Or</span></h2>
                        <button className="google-btn cursor" onClick={linkGoogle}>
                            <span className="btn-icon"><FcGoogle size={22} /></span>
                            <span className="btn-span">Link Google Account</span>
                        </button>
                    </div>
                    <label className="align-right"><Link to="/">Back</Link></label>
                </div>
            </form>
        </div>
    );
}

export default LinkAccount;