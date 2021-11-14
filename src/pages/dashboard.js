import React, { useEffect } from 'react'
import Timeline from '../components/timeline'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Stories from '../components/stories'

function Dashboard() {

    useEffect(() => {
        document.title = 'Dashboard - Upluxure'
    }, [])

    return (
        <>
            <div>
                <Header />
                <div className="grid">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default Dashboard
