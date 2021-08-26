import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const LinkAccount = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();
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
        try {
            setMessage('');
            setError("");
            setLoading(true);
            await linkEmailandPassword(emailRef.current.value, passwordRef.current.value, userNameRef.current.value);
            setMessage('Successfully Linked.')
        } catch (err) {
            console.log(err);
            setError("Failed to Link account.");
        }

        setLoading(false);
    }

    const linkGoogle = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await linkWithGoogle()
                .then(() => {
                    history.push('/');
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Link Account</h2>
            {error && <h1>{error}</h1>}
            <span className="text-center"><h1>{message}</h1></span>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" ref={userNameRef} className="input" required></input>
                    <label>Email</label>
                    <input type="email" ref={emailRef} className="input" required></input>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} className="input" required></input>
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