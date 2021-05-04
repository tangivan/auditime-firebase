import React from 'react';
import TimerData from './TimerData';
import Chart from './Chart';

const Analytics = () => {

    return (
        <div className="analyticsContainer column center">
            <TimerData />
            <Chart />
        </div>
    );
}

export default Analytics;