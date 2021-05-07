import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IoIosTimer } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'

const Navbar = () => {
    const history = useHistory();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [active, setActive] = useState(true);

    useEffect(() => {
        location.pathname === '/' ? setActive(true) : setActive(false);
    }, [location]);



    const timers = () => {
        setDropdown(false);
        history.push("/");
    }

    const analytics = () => {
        setDropdown(false);
        history.push("/analytics");
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
            <nav className="full-height">
                <ul className="full-height row space-between">
                    <div className="row">
                        <span>
                            <li className="full-height logo row center align-center cursor" onClick={timers}><IoIosTimer color='#DEEDFE' size={50} />AudiTime</li>
                        </span>
                        <span className="row navtab">
                            <li className={active ? "full-height nav-item  nav-item-active row center align-center margin-r-sm" : "full-height nav-item  nav-item-inactive row center align-center margin-r-sm"} onClick={timers}>Timers</li>
                            <li className={!active ? "full-height nav-item  nav-item-active row center align-center margin-r-sm" : "full-height nav-item  nav-item-inactive row center align-center margin-r-sm"} onClick={analytics}>Analytics</li>
                        </span>
                    </div>
                    <div className="dropdown">
                        <li className="dropdown-btn row end" onClick={handleToggle}>
                            <span className="circle initials">{currentUser.displayName.split(" ").map((n) => n[0]).join('').toUpperCase()}</span>
                            <MdExpandMore size={20} className={dropdown ? "expand expand-arrow-up" : "expand expand-arrow-down"} />
                        </li>
                        {dropdown && <div className="dropdown-content">
                            <li className="dropdown-profile"><span className="margin-sm">{currentUser.displayName}</span></li>
                            <li className="nav-item" onClick={updateProfile}><span className="margin-sm"> Update Profile</span></li>
                            <li className="nav-item" onClick={handleLogout}><span className="margin-sm"> LogOut</span></li>
                        </div>}
                    </div>
                </ul>
            </nav >
        </div >
    );
}

export default Navbar;