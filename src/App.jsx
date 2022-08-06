import { useEffect, useState } from 'react'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import Footer from './components/Footer'
import Forecast from './components/Forecast'
import Header from './components/Header'
import Search from './components/Search'

function App() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [changeV, setChangeV] = useState(true)

    useEffect(() => {
        const succes = ((pos) => {
            const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`)
            const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`)

            Promise.all([currentWeatherFetch, forecastFetch])
                .then(async (response) => {
                    const weatherResponse = await response[0].json()
                    const forecastResponse = await response[1].json()

                    const nameCountry = `${weatherResponse.name}, ${weatherResponse.sys.country}`
                    forecastResponse.degree = '°C'
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
                console.log(forecastResponse)
                setCurrentWeather({ city: searchData.label, ...weatherResponse })
                setForecast({ city: searchData.label, ...forecastResponse })
            })
            .catch((err) => console.log(err))
    }

    const handleChange = (changeValue) => {
        let aux = forecast
        console.log(aux);
        setChangeV(changeValue)
        if (changeValue) {
            for (let i = 0; i < aux.list.length; i++) {
                aux.list[i].main.feels_like = Math.round((((aux.list[i].main.feels_like - 32) * 5 / 9) + Number.EPSILON) * 100) / 100
                aux.list[i].main.temp_max = Math.round((((aux.list[i].main.temp_max - 32) * 5 / 9) + Number.EPSILON) * 100) / 100
                aux.list[i].main.temp_min = Math.round((((aux.list[i].main.temp_min - 32) * 5 / 9) + Number.EPSILON) * 100) / 100
            }
            aux.degree = '°C'
        } else {
            for (let i = 0; i < aux.list.length; i++) {
                aux.list[i].main.feels_like = Math.round((((aux.list[i].main.feels_like * 9 / 5) + 32) + Number.EPSILON) * 100) / 100
                aux.list[i].main.temp_max = Math.round((((aux.list[i].main.temp_max * 9 / 5) + 32) + Number.EPSILON) * 100) / 100
                aux.list[i].main.temp_min = Math.round((((aux.list[i].main.temp_min * 9 / 5) + 32) + Number.EPSILON) * 100) / 100
            }
            aux.degree = '°F'
        }
        setForecast(aux)
    }
    return (
        <div className="App">
            <Header />
            <Search onSearchChange={handleOnChangeChange} />
            {currentWeather && <CurrentWeather data={currentWeather} onChange={handleChange} />}
            {forecast && <Forecast data={forecast} />}
            <Footer />
        </div>
    )
}

export default App
