import React, { useContext } from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import '../../styles/css/suggestions-user.css'
import UserContext from '../../context/user'

const Sidebar = () => {

    const { user: { docId, fullName, username, userId, following } } = useUser()

    const user = useContext(UserContext)
    // console.log('docId', docId)

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <div className="sidebar">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} LoggedInUserDocId={docId} />
        </div>
    )
}

export default Sidebar

// Sidebar.whyDidYouRender = true

