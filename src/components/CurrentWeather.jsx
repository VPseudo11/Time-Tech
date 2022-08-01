import React, { useState } from 'react'
import './CurrentWeather.css'

const CurrentWeather = ({ data }) => {
    const [change, setChange] = useState(false)
    const [temp, setTemp] = useState([(Math.round(data.main.temp)), '°C', (data.main.feels_like)])
    const handleTemp = (() => {
        setChange(!change)
        if (change) {
            setTemp([Math.round((temp[0] - 32) * 5 / 9), '°C', ((temp[2] - 32) * 5 / 9)])

        } else {
            setTemp([((temp[0] * 9 / 5) + 32), '°F', ((temp[2] * 9 / 5) + 32)])
        }
    })
    return (
        <div className='weather'>
            <div className='top'>
                <div>
                    <p className='city'>{data.city}</p>
                    <p className='weather-description'>{data.weather[0].description}</p>
                </div>
                <img src={`/icons/black/${data.weather[0].icon}.png`} alt="weather" className='weather-icon' />
            </div>
            <div className='bottom'>
                <p className='temperature'>{temp[0]}{temp[1]}</p>
                <div className='details'>
                    <div className='parameter-row'>
                        <span className='parameter-label top'>Details</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Feels like</span>
                        <span className='parameter-value'>{temp[2]}{temp[1]}</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Wind</span>
                        <span className='parameter-value'>{data.wind.speed} m/s</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Humidity</span>
                        <span className='parameter-value'>{data.main.humidity}%</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Pressure</span>
                        <span className='parameter-value'>{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
            <div className='ChangeButton'>
                <button onClick={handleTemp}>°C/°F</button>
            </div>
        </div>
    )
}

export default CurrentWeather