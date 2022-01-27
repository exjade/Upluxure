import React from 'react';
import useUser from '../../hooks/use-user'
import SuggestedProfiles from './suggestions'

const FollowPeople = () => {

    const { user,
        user: {
            docId,
            fullName,
            username,
            userId,
            following,
            photoURL,
            AboutMe,
            Country,
            followers,
        } } = useUser()

    return (

        <div>
            <SuggestedProfiles
                userId={userId}
                following={following}
                followers={followers}
                LoggedInUserDocId={docId}
                user={user}
                photoURL={photoURL}
                AboutMe={AboutMe}
                Country={Country}
            />
        </div>


    )
};

export default FollowPeople;
