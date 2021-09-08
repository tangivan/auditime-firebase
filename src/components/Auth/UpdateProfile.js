import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            setMessage('You have successfully updated your account.');
        }).catch((error) => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="auth-form-outer">
            <h2 className="header">Update Profile</h2>
            <span className="text-center"><h2 className="text-center-blue" data-testid="message">{message}</h2></span>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" ref={emailRef} required defaultValue={currentUser.email}></input>
                    <label htmlFor="pass">Password</label>
                    <input data-testid="pass" id="pass" type="password" ref={passwordRef} placeholder="Leave blank to keep the same password."></input>
                    <label htmlFor="passconfirm">Password Confirmation</label>
                    <input data-testid="pass-confirm" id="passconfirm" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same password."></input>
                    {error && <h1 className="text-center-red">{error}</h1>}
                    <button disabled={loading} className="btn  cursor">Update</button>
                    <label><Link to="/">Cancel Update</Link></label>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;