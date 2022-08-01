import { useEffect, useState } from 'react'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import Search from './components/Search'

function App() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
/*     const [change, setChange] = useState(true) */

    useEffect(() => {
        const succes = ((pos) => {
            console.log(pos.coords);
            const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`)
            const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`)

            Promise.all([currentWeatherFetch, forecastFetch])
                .then(async (response) => {
                    const weatherResponse = await response[0].json()
                    const forecastResponse = await response[1].json()

                    const nameCountry = `${weatherResponse.name}, ${weatherResponse.sys.country}`

                    setCurrentWeather({ city: nameCountry, ...weatherResponse })
                    setForecast({ city: nameCountry.name, ...forecastResponse })
                })
                .catch((err) => console.log(err))
        })
        navigator.geolocation.getCurrentPosition(succes)
    }, [])

    const handleOnChangeChange = (searchData) => {
        const [lat, lon] = searchData.value.split(' ')

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json()
                const forecastResponse = await response[1].json()

                setCurrentWeather({ city: searchData.label, ...weatherResponse })
                setForecast({ city: searchData.label, ...forecastResponse })
            })
            .catch((err) => console.log(err))
    }

/*     const handleTemp = (() => {
        setChange(!change)
        const tempC = currentWeather.main.temp
        console.log(tempC)
        if (change) {
            currentWeather.main.temp = (Math.round(tempC) * 9 / 5) + 32
        } else {
            currentWeather.main.temp = tempC
        }
    }) */
    return (
        <div className="App">
            <Search onSearchChange={handleOnChangeChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
        </div>
    )
}

export default App
