import React, { useState, useEffect } from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import '../../styles/css/suggestions-user.css'

const Sidebar = () => {

    const { user: { fullName, username, userId } } = useUser()

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <>
            <div className="p-4 ">
                <User username={username} fullName={fullName} />
                <Suggestions userId={userId} />
            </div>
        </>
    )
}

export default Sidebar

Sidebar.whyDidYouRender = true