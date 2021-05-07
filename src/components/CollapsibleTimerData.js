import React, { useState } from 'react';
import { FormatDate, FormatDuration } from '../utilities/dataFormatter';
import { v4 as uuidv4 } from 'uuid';

const CollapsibleTimerData = ({ timer }) => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        toggle ? setToggle(false) : setToggle(true);
    }

    return (
        <tbody>
            {timer.timerHistory.map(timerHistoryData => {
                return (
                    <tr className="timerHistory" key={uuidv4()}>
                        <td>{timer.name}</td>
                        <td>{timerHistoryData.events}</td>
                        <td>{FormatDate(timerHistoryData.timeStamp, 'date')}</td>
                        <td>{FormatDate(timerHistoryData.timeStamp, 'time')}</td>
                        <td>{FormatDuration(timer.timeRunTotal, timer.timerHistory[0].events)}</td>
                        <td>{FormatDuration(timerHistoryData.duration, timer.timerHistory[0].events)}</td>
                        <td>{FormatDuration(timer.timeShown, 'timeshown')}</td>
                    </tr>
                )
            })}
        </tbody>
    );
}

export default CollapsibleTimerData;