import React, { useState } from 'react';
import firebase from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import OutsideClick from '../../hooks/OutsideClick';

const TimerForm = ({ handleToggleClick, timer }) => {
    const [name, setName] = useState('');
    const { getUuid } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        !timer ? firebase.firestore().collection('users').doc(getUuid()).collection('timers').add({
            name,
            timeShown: 0,
            timeRunTotal: 0,
            timerHistory: [{
                events: 'created',
                duration: 0,
                timeStamp: Date.now()
            }],
        })
            :
            firebase.firestore().collection('users').doc(getUuid()).collection('timers').doc(timer.id).update({ name });

        setName('');
        handleToggleClick();
    }

    return (
        <div className="order">
            <div className='page-mask'></div>
            <OutsideClick action={handleToggleClick}>
                <div className="form-outer">
                    <h2 className="header"> {!timer ? 'Create a Timer' : 'Edit Timer Name'}</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="timerLabel">Timer Name</label>
                            <input
                                maxLength='13'
                                type='text'
                                id='timerLabel'
                                className='input'
                                autoComplete='off'
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <button className="btn  cursor">Submit</button>
                    </form>
                </div>
            </OutsideClick>
        </div>
    );
}

export default TimerForm;