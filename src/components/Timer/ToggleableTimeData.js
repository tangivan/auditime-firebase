import React, { useState } from 'react';
import { FormatDate, FormatDuration } from '../../utils/dataFormatter';
import CollapsibleTimerData from './CollapsibleTimerData';

const ToggleableTimeData = ({ timer }) => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        toggle ? setToggle(false) : setToggle(true);
    }

    return (
        <React.Fragment>
            <tbody role="rowgroup" onClick={handleToggle}>
                <tr>
                    <td >{timer.name}</td>
                    <td>{timer.timerHistory[0].events}</td>
                    <td>{FormatDate(timer.timerHistory[0].timeStamp, 'date')}</td>
                    <td>{FormatDate(timer.timerHistory[0].timeStamp, 'time')}</td>
                    <td>{FormatDuration(timer.timeRunTotal, timer.timerHistory[0].events)}</td>
                    <td>{FormatDuration(timer.timerHistory[0].duration, timer.timerHistory[0].events)}</td>
                    <td>{FormatDuration(timer.timeShown, 'timeshown')}</td>
                </tr>
            </tbody>

            {toggle && <CollapsibleTimerData timer={timer} />}
        </React.Fragment>
    );
}

export default ToggleableTimeData;