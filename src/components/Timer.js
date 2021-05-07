import React from 'react';

const pi = 3.146
const radius = 65;
const stroke_width = 6;
const circumference = radius * 2 * pi;
let progress = 0;

const Timer = ({ time }) => {
    progress = (time.centiseconds / 100) * circumference;
    return (
        <>
            <svg width="300" height="300" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r={radius + 2} strokeWidth="6" stroke="#cdddf0" fill="none" strokeLinecap="round" />
                <circle cx="75" cy="75" r={radius} strokeWidth="6" stroke="#DEEDFE" fill="none" strokeLinecap="round" />
                {progress > 0 && (<circle cx="75" cy="75" r={radius} strokeWidth="2" stroke="#ff2e63" fill="none" strokeDasharray={[progress, circumference]} strokeDashoffset="0" transform="rotate(-90,75,75)" strokeLinecap="round" />)}
                <text x="50%" y="50%" textAnchor="middle" stroke="#464159" strokeWidth="2px" dy=".3em">
                    <tspan fontSize="15px">{time.hours} : {time.minutes} : {time.seconds}</tspan>
                </text>
            </svg>
        </>
    );
}

export default Timer;