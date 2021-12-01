import React, { useEffect, useState } from 'react'
import '../styles/css/stories.css';
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'
import Stories from '../components/stories'
import SearchBarDown from '../components/searchbardown'

function Dashboard() {

    useEffect(() => {
        document.title = 'Dashboard - Upluxure'
    }, [])

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [])

    const handleRefresh = () => { 
        window.location.reload();
    }

    const [isLoading, setIsLoading] = useState(true);

    const loader = () => {
        return (
            <div className="loader"><span>Up</span><span>luxure</span></div>
        )
    }

    if (isLoading) {
        return loader()
    } else {
        return (
            <>
                    <div>
                        <Header />
                        <Stories />
                        <div className="grid grid-cols-3 gap-8 justify-between mx mx-auto max-w-screen-lg">
                            <Timeline />
                            <Sidebar />
                        </div>
                        <SearchBarDown />
                    </div>
            </>
        )
    }
}

export default Dashboard
