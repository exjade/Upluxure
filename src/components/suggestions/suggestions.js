import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profiles'

const SuggestedProfiles = ({ 
    user, 
    userId, 
    following, 
    followers,
    LoggedInUserDocId, 
    photoURL, 
    AboutMe,
    Country,
}) => {

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
                <div className="text-sm flex items-center justify-center mb-2 ml-3 mt-5">
                    <p className="font-bold text-white-primary">Suggestions for you</p>
                </div>
                <div className="mt-4 grid gap-5 mb-24">
                    {
                        profiles.map( (profile) => (
                            <SuggestedProfile 
                                user={user}
                                key={profile.docId}
                                profileDocId={profile.docId}
                                username={profile.username}
                                profileId={profile.userId}
                                userId={userId}
                                LoggedInUserDocId={LoggedInUserDocId}
                                photoURL={photoURL}
                                AboutMe={profile.AboutMe}
                                Country={profile.Country}
                                followers={profile.followers}
                                following={profile.following}
                            />
                        ))
                    }
                </div>
            </div>
        ) : (null)
    )
}

export default SuggestedProfiles

SuggestedProfiles.propTypes = {
    useId: PropTypes.string,
    following: PropTypes.array,
    LoggedInUserDocId: PropTypes.string,
}