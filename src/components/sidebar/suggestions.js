import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profiles'

const Suggestions = ({ user, userId, following, LoggedInUserDocId, photoURL }) => {

    const [profiles, setProfiles] = useState(null)

    // we need to get the suggested profiles (firebase server)
    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following)
            setProfiles(response)
        }
        if(userId) {
            suggestedProfiles()
        }
    }, [userId])  // eslint-disable-line react-hooks/exhaustive-deps
    // getSuggestedProfiles(userId)
    // call the async func from the server 
    // store it in state
    // render (wait for the profiles to be loaded )

    return (
        !profiles ? (
            <Skeleton count={1} height={150} className="mt-5" />
        ) : profiles.length > 0 ? (
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center justify-between mb-2 ml-3">
                    <p className="font-bold text-white-primary">Suggestions for you</p>
                </div>
                <div className="mt-4 grid gap-5">
                    {
                        profiles.slice(0,8).map( (profile) => (
                            <SuggestedProfile 
                                user={user}
                                key={profile.docId}
                                profileDocId={profile.docId}
                                username={profile.username}
                                profileId={profile.userId}
                                userId={userId}
                                LoggedInUserDocId={LoggedInUserDocId}
                                photoURL={photoURL}
                            />
                        ))
                    }
                </div>
            </div>
        ) : (null)
    )
}

export default Suggestions

Suggestions.propTypes = {
    useId: PropTypes.string,
    following: PropTypes.array,
    LoggedInUserDocId: PropTypes.string,
}