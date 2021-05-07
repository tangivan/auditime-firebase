import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext'

const TimerForm = ({ handleToggleClick, timer }) => {
    const [name, setName] = useState('');
    const { getUuid } = useAuth();
    let create = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(getUuid());
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
            firebase.firestore().collection('timers').doc(timer.id).update({ name });

        setName('');
        handleToggleClick();
    }

    return (
        <>
            <div className='page-mask'></div>
            <div className='form-outer column align-center center'>
                <form className='form column align-center' onSubmit={handleSubmit}>
                    <label htmlFor='timerLabel'>
                        {!timer ? 'Create a Timer' : 'Edit Timer Name'}
                    </label>
                    <div className='form-input align-center'>
                        <input
                            maxLength='13'
                            type='text'
                            id='timerLabel'
                            className='input'
                            autoComplete='off'
                            placeholder="Timer Name"
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <button
                            className='button cursor'
                            type='submit'>
                            Submit
                         </button>
                        <button className='cancel-form cursor' onClick={handleToggleClick}>
                            <MdCancel color='#3493d9' size={55} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TimerForm;