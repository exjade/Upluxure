import React, { useState, useEffect } from 'react'
import Profile from './profile'
import Header from '../header'
import Menu from './menu'

const Settings = () => {

    return (
        <div className='mx-auto max-w-screen-lg h-screen'>
            <Header />
            <Profile />
            <Menu />
        </div>
    )
}

export default Settings

