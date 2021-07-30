import React from 'react'
import { Cards, Chart, CountryPicker } from './Components'
import * as styles from './App.module.scss'
import { fetchData } from './api'

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData()

    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)

    this.setState({ data: fetchedData, country: country})
  }

  render () {
    const { data, country } = this.state

    return ( 
      <div className={styles.container}>
        <h1 className={styles.title}>Covid-19 <br/>
        Tracker</h1>
       <CountryPicker handleCountryChange={this.handleCountryChange}/>
       <Cards data={data}/>
       <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App