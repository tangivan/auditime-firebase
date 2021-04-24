import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <div className="center column">
            <h1>Sign Up</h1>
            {error && <h1>{error}</h1>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef}></input>
                <label>Password</label>
                <input type="password" ref={passwordRef}></input>
                <label>Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef}></input>
                <button disabled={loading}>Sign up</button>
                <label>Already have an account? <Link to="/login"> Log In </Link></label>
            </form>
        </div>
    );
}

export default SignUp;