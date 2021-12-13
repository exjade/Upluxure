import {useEffect} from 'react'
import Settings from '../components/settings'
import '../styles/material.css'

const MyAccount = () => {
    
    useEffect(() => {
        document.title = 'My Account - Upluxure'
    }, [])

    return (
        <>
            <Settings />
        </>
    )
}

export default MyAccount
