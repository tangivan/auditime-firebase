import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
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
            history.push('/');
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="center column">
            <h1> Update Profile </h1>
            {error && <h1>{error}</h1>}
            <form className="column" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef} required defaultValue={currentUser.email}></input>
                <label>Password</label>
                <input type="password" ref={passwordRef} placeholder="Leave blank to keep the same password."></input>
                <label>Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same password."></input>
                <button disabled={loading}>Update</button>
                <label><Link to="/">Cancel Update</Link></label>
            </form>
        </div>
    );
}

export default UpdateProfile;