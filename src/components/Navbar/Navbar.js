import React, { useState, useEffect, useRef } from 'react';
import OutsideClick from '../../hooks/OutsideClick';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IoIosTimer } from 'react-icons/io';
import { MdExpandMore } from 'react-icons/md';

const Navbar = () => {
    const history = useHistory();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [displayName, setDisplayName] = useState("")
    const [active, setActive] = useState(true);


    useEffect(() => {
        location.pathname === '/' ? setActive(true) : setActive(false);
        console.log(currentUser);
    }, [location]);

    useEffect(() => {
        if (typeof currentUser.providerData[0] !== 'undefined') {
            if (currentUser.providerData[0].displayName !== displayName) {
                if (currentUser.providerData[0].displayName !== null) {
                    setDisplayName(currentUser.providerData[0].displayName.split(" ").map((n) => n[0]).join('').toUpperCase());
                }
                else
                    setDisplayName("G");
            }
        }
    }, [currentUser]);

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

    const handleOutsideToggle = () => {
        setDropdown(false);
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

    const linkAccount = () => {
        history.push("/link-account");
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
                    <OutsideClick action={handleOutsideToggle}>
                        <div className="dropdown">
                            <li className="dropdown-btn row end" onClick={handleToggle}>
                                <span className="circle initials">{!currentUser.isAnonymous ? displayName : "G"}</span>
                                <MdExpandMore size={20} className={dropdown ? "expand expand-arrow-up" : "expand expand-arrow-down"} />
                            </li>
                            {dropdown && <div className="dropdown-content">
                                <li className="dropdown-profile"><span className="margin-sm">{!currentUser.isAnonymous ? currentUser.providerData[0].displayName : "Guest"}</span></li>
                                {!currentUser.isAnonymous ? <li className="nav-item" onClick={updateProfile}><span className="margin-sm"> Update Profile</span></li> :
                                    <li className="nav-item" onClick={linkAccount}><span className="margin-sm"> Link Account</span></li>}
                                <li className="nav-item" onClick={handleLogout}><span className="margin-sm"> LogOut</span></li>
                            </div>}
                        </div>
                    </OutsideClick>
                </ul>
            </nav >
        </div >
    );
}

export default Navbar;