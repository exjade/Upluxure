import React, { useState, useEffect } from 'react'
import Profile from './profile'
import Header from '../header'
import Menu from './menu'
import UseUser from '../../hooks/use-user'

const Settings = () => {

    const {
        user,
        user: {
            rol
        }
    } = UseUser()
    console.log(rol)

    return (
        <div className='mx-auto max-w-screen-lg h-screen'>
            <Header />
            <Profile />
            <Menu rol={rol} />
        </div>
    )
}

export default Settings

