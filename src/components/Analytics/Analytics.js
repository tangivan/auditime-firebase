import React from 'react';
import TimerData from '../Timer/TimerData';
import Chart from './Chart';

const Analytics = () => {
    return (
        <div className="analyticsContainer column center align-center">
            <TimerData />
            <Chart />
        </div>
    );
}

export default Analytics;