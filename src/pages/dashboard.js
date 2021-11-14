import React, { useEffect } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'
import Stories from '../components/stories'
import SearchBar from '../components/searchbar'

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