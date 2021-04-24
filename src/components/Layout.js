import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Layout = () => {
    const history = useHistory();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");

    const timers = () => {
        history.push("/");
    }

    const analytics = () => {
        history.push("/analytics");
    }

    const handleLogout = () => {
        setError('');

        try {
            logout()
            history.push('/login')
        } catch (error) {
            setError('Failed to log out');
            console.log(error);
        }
    }

    return (
        <div className="layout column">
            <nav>
                <ul className="row center">
                    <li className="nav-item" onClick={timers}>Timers</li>
                    <li className="nav-item" onClick={analytics}>Analytics</li>
                    <li className="nav-item"> Current User: {currentUser.email} </li>
                    <li className="nav-item" onClick={handleLogout}> LogOut</li>
                </ul>
            </nav>
        </div>
    );
}

export default Layout;