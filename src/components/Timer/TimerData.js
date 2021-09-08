import React from 'react';
import { BeatLoader } from 'react-spinners';
import ToggleableTimeData from './ToggleableTimeData';
import useFetch from '../../hooks/useFetch';

const TimerData = () => {
    const { loading, timerList } = useFetch();

    return (
        <>
            {loading ? <div data-testid="loader" className="loader"><BeatLoader size={60} /></div> :
                <div className="timerDataTable">
                    <table className="timerTable">
                        <tbody>
                            <tr>
                                <th>Timer Name</th>
                                <th>Events</th>
                                <th>Date Started</th>
                                <th>Time Started</th>
                                <th>Total Time</th>
                                <th>Session Time</th>
                                <th>Time Shown</th>
                            </tr>
                        </tbody>
                        {timerList.map(timer => {
                            return (
                                <ToggleableTimeData timer={timer} key={timer.id} />
                            )
                        })}
                    </table>
                </div>
            }
        </>
    );
}

export default TimerData;