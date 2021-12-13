import { useEffect } from 'react'
import Settings from '../components/settings'

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
