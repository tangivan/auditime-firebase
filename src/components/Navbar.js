import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IoIosTimer } from 'react-icons/io'

const Navbar = () => {
    const history = useHistory();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [active, setActive] = useState('');

    const timers = () => {
        history.push("/");
        setActive('timers');
    }

    const analytics = () => {
        history.push("/analytics");
        setActive('analytics');
    }

    const handleToggle = () => {
        setDropdown(!dropdown);
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

    const updateProfile = () => {
        history.push("/update-profile");
    }

    return (
        <div className="layout">
            <nav>
                <ul className="row space-between">
                    <div className="row">
                        <span>
                            <li className="nav-item row center"><IoIosTimer color='#DEEDFE' size={50} />Auditime</li>
                        </span>
                        <span className="row navtab">
                            <li className={active === "timers" ? "nav-item nav-item-active" : "nav-item nav-item-inactive"} onClick={timers}>Timers</li>
                            <li className={active === "analytics" ? "nav-item nav-item-active" : "nav-item nav-item-inactive"} onClick={analytics}>Analytics</li>
                        </span>
                    </div>
                    <div className="dropdown">
                        <li className="nav-item dropdown-btn" onClick={handleToggle}>{currentUser.email} </li>
                        {dropdown && <div className="-dropdowncontent">
                            <li className="nav-item" onClick={updateProfile}> Update Profile</li>
                            <li className="nav-item" onClick={handleLogout}> LogOut</li>
                        </div>}
                    </div>
                </ul>
            </nav >
        </div >
    );
}

export default Navbar;