import React from 'react'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion'
import './Forecast.css'

const Forecast = ({ data }) => {
    console.log('in forecast' + data.list.splice(0, 7))
    return (
        <>
            <label className='title'>Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, index) => {
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img src={`/icons/black/${item.weather[0].icon}.png`} alt="weater" className='iconSmall' />
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel></AccordionItemPanel>
                    </AccordionItem>
                })}
            </Accordion>
        </>
    )
}

export default Forecast