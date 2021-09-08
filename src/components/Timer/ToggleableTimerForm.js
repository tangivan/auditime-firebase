import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io'
import TimerForm from './TimerForm';

const ToggleableTimerForm = () => {
    const [toggleForm, setToggleForm] = useState(false);

    const handleToggleClick = () => {
        toggleForm ? setToggleForm(false) : setToggleForm(true);
    }
    return (
        <div className="row center align-center">
            <button data-testid="addBtn" className="add-btn hover-scale cursor"
                onClick={handleToggleClick}
            >
                <IoIosAddCircleOutline size={70} color="#99cff7" />
            </button>
            {toggleForm && (<TimerForm handleToggleClick={handleToggleClick} />)}

        </div>
    );
}

export default ToggleableTimerForm;