import React from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import '../../styles/css/suggestions-user.css'

const Sidebar = () => {

    const { user: { docId, fullName, username, userId, following } } = useUser()

    // console.log('docId', docId)

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <div className="p-4 ">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} LoggedInUserDocId={docId} />
        </div>
    )
}

export default Sidebar

Sidebar.whyDidYouRender = true

