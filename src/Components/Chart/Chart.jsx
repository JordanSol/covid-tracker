import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { fetchDailyData } from '../../api'
import * as styles from './Chart.module.scss'

function Chart({ data: {confirmed, deaths, recovered}, country }) {
    const [dailyData, setDailyData] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }

        fetchAPI()
    }, [])

    const lineChart = (
        dailyData.length
        ? (
            <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#e9c46a',
                    fill: true
                },{
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: '#e76f51',
                    backgroundColor: 'rgba(231, 111, 81, 0.5)',
                    fill: true
                }],
                }}
            />) : null
    )

    const barChart = (
        confirmed
            ? (
                <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            '#e9c46a',
                            '#2a9d8f',
                            '#e76f51'
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: { display: true, text: `Current state is ${country}`}
                }}/>
            ) : null
    )
    

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart