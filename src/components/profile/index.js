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
    const [{ profile, photosCollection, followerCount, followingCount }, dispatch] = useReducer(reducer, initialState)

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
            <Header />
            <Photos photos={photosCollection} />
            <p>Working {user.username} 8:18:30 </p>

        </>
    )
}

export default Profile

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired

}