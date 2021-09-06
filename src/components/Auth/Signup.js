import React, { useRef, useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { useAuth } from '../../context/AuthContext'
import { addDefaultTimer } from '../../utils/firebaseHelper'
import { Link, useHistory } from 'react-router-dom'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, updateName, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(false);
            history.push("/");
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
                updateName(cred.user, fnameRef.current.value, lnameRef.current.value);
                addDefaultTimer(cred.user.uid);
            })
            setLoading(true);
        } catch (error) {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <>
            {loading ? <div className="loader"><BeatLoader size={60} /></div> :
                <div className="auth-form-outer">
                    <h2 className="header">Create an Account</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input id="fname" type="text" ref={fnameRef} className="input" required></input>
                            <label htmlFor="lname">Last Name</label>
                            <input id="lname" type="text" ref={lnameRef} className="input" required></input>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" ref={emailRef} className="input" required></input>
                            <label htmlFor="pass">Password</label>
                            <input id="pass" type="password" ref={passwordRef} className="input" required></input>
                            <label htmlFor="passconfirm">Password Confirmation</label>
                            <input id="passconfirm" type="password" ref={passwordConfirmRef} className="input" required></input>
                        </div>
                        {error && <h1 className="text-center-red">{error}</h1>}
                        <button className="btn cursor" disabled={loading}>Sign up</button>
                        <label className="login-label">Already have an account? <Link to="/login"> Log In </Link></label>
                    </form>
                </div>
            }
        </>
    );
}

export default SignUp;