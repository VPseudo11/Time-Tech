import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
}
    from 'react-accessible-accordion'
import './Forecast.css'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Forecast = ({ data }) => {

    const dayInAWeek = new Date().getDay()
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))
    return (
        <>
            <label className='title'>Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, index) => {
                    return (<AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img src={`/icons/black/${item.weather[0].icon}.png`} alt="weater" className='iconSmall' />
                                    <label className='day'>{forecastDays[index]}</label>
                                    <label className='description'>{item.weather[0].description}</label>
                                    <label className='min-max'>
                                        {item.main.temp_min}{data.degree} - {item.main.temp_max}{data.degree}
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='daily-details-grid'>
                                <div className='daily-details-grid-item'>
                                    <label>Feels Like</label>
                                    <label>{item.main.feels_like}{data.degree}</label>
                                </div>
                                <div className='daily-details-grid-item'>
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className='daily-details-grid-item'>
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className='daily-details-grid-item'>
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className='daily-details-grid-item'>
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className='daily-details-grid-item'>
                                    <label>Sea Level</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>)
                })}
            </Accordion>
        </>
    )
}

export default Forecast