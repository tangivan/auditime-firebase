import React, { useState, useEffect } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import firebase from '../../firebase'
import { formatNumberInMins } from '../../utils/dataFormatter';
import { useAuth } from '../../context/AuthContext';
import { BeatLoader } from 'react-spinners'

defaults.plugins.legend.display = false;

const Chart = () => {
    const [timerList, setTimerList] = useState([]);
    const { getUuid } = useAuth();
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ]
    });


    useEffect(() => {
        setLoading(true);
        const unsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(getUuid())
            .collection('timers')
            .onSnapshot((snapshot) => {
                const newTimers = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setTimerList(newTimers);
                setLoading(false);
            })
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        let labels = [];
        let data = [];

        timerList.map((timer) => {
            labels = labels.concat(timer.name)
            data = data.concat(formatNumberInMins(timer.timeRunTotal))
        })

        setChartData({
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                }
            ]
        })
    }, [timerList])

    return (
        <>
            {loading ? <div className="loader"><BeatLoader size={60} /></div> :
                <div className='chart-container row center margin-r-sm'>
                    <div className="chart">
                        <h1>Hours Spent on Activities</h1>
                        <Bar
                            data={chartData}
                            width={1300}
                            height={350}
                            options={{
                                maintainAspectRatio: false,
                                responsive: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default Chart;