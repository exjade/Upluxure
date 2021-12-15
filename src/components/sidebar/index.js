import React, { useContext } from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import '../../styles/css/suggestions-user.css'
import UserContext from '../../context/user'

const Sidebar = () => {

    const { user, user: { docId, fullName, username, userId, following } } = useUser()

        // const user = useContext(UserContext)
    // console.log('docId', docId)

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <div className="sidebar border-l-2 border-black-border">
            <User username={username} fullName={fullName} user={user}/>
            <Suggestions userId={userId} following={following} LoggedInUserDocId={docId} user={user} />
        </div>
    )
}

export default Sidebar

// Sidebar.whyDidYouRender = true

