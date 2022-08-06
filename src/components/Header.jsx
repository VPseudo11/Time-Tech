import React from 'react'
import './Header.css'
import logo from '/icons/logo/TimeTech-Logo-2.png'

const Header = () => {
    return (
        <div className='Header'>
            <div className='Logo'>
                <img src={logo} alt="" />
            </div>
            <div className='ColorMode'>
                colormode
            </div>
        </div>
    )
}

export default Header