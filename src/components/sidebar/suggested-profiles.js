import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

export default function SuggestedProfile({ 
    profileDocId, 
    username, 
    profileId, 
    userId,
    LoggedInUserDocId
 }) {
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true)
        
        // 0) create 2 functions
        // 1) update following array if the actual user
        await updateLoggedInUserFollowing(LoggedInUserDocId, profileId, false)
        // 2) update followers array of the user who has been followed
        await updateFollowedUserFollowers(profileDocId, userId, false)
    }

    return (
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between">
                <div className="flex items-center justify-between">
                    <Avatar 
                        className="rounded-full w-8 flex mr-3"
                        src={`/images/avatars/${username}.jpg`}
                        alt="suggested users"
                    />
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm text-white-primary" >
                            {username}
                        </p>
                    </Link>
                </div>
                <button
                    className="text-xs font-bold text-gray-primary"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        ) : (
            null
        )
    )
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    LoggedInUserDocId: PropTypes.string.isRequired
}