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
                    borderColor: '#49a078',
                    fill: true
                },{
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: '#216869',
                    backgroundColor: 'rgba(33, 104, 105,0.5)',
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
                            '#49a078',
                            '#8cb190',
                            '#216869'
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