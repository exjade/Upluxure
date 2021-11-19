import React, { useState, useEffect} from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import '../../styles/css/suggestions-user.css'

const Sidebar = () => {

    const { user: { fullName, username, userId } } = useUser()

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => { 
        setDesktop(window.innerWidth > 700);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <>
            {
                isDesktop ? (
                    <div className="p-4 ">
                    <User username={username} fullName={fullName} />
                    <Suggestions userId={userId} />
                </div>
                ) : (
                    <></>
                )
            }

        </>
    )
}

export default Sidebar

Sidebar.whyDidYouRender = true