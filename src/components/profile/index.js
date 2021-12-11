import { useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Photos from './photos'
import { getUserPhotosByUsername } from '../../services/firebase'


const Profile = ({ user }) => {

    const reducer = (state, newState) => ({ ...state, ...newState })
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0,
        followingCount: 0,
    }
    // dispatch - set values in state
    const [{ profile, photosCollection, followerCount, followingCount }, dispatch] = useReducer(
            reducer,
            initialState
        )

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username)
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length,
                followingCount: user.following.length,
            })
        }
        getProfileInfoAndPhotos()
    }, [user.username])

    return (
        <>
            <Header 
            PhotosCount={ photosCollection ? photosCollection.length : 0 }
            profile={ profile }
            followerCount={ followerCount }
            followingCount={ followingCount }
            setFollowerCount={ dispatch }
            setFollowingCount={ dispatch }
            />
            {/* <p className='text-white-primary'>Working {user.username} 09:35:58 </p> */}
            <Photos photos={photosCollection} />

        </>
    )
}

export default Profile

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
    })

}