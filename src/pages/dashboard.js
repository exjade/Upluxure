import React, { useEffect } from 'react'
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

    return (
        <>
            <div>
                <Header />
                <Stories />
                <div className="grid">
                    <Timeline />
                    <Sidebar />
                </div>
                <SearchBarDown />
            </div>
        </>
    )
}

export default Dashboard
