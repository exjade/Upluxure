import React, { useReducer, useState, useEffect } from 'react'
import { getUserPhotosByUsername } from '../../services/firebase'
import PropTypes from 'prop-types'
import Header from './header'
import HomeIconComponent from './home'
import Photos from './photos'
import ProfileInformation from './profile-information';
import '../../styles/modules/tabs.css';
import SimpleReactLightbox from 'simple-react-lightbox'

/* MATERIAL UI*/
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';


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


    /* Component Switch*/
    const [openTabs, setOpenTabs] = useState({
        showPhoto: true,
        showInformation: false
    });

    const showPhotoTab = () => {
        if (openTabs.showPhoto) {
            <Photos />

        }
    }
    const showInfoTabs = () => {
        if (openTabs.showInformation) {
            <ProfileInformation />
        }
    }
    /* Switch Icons */
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Header
                PhotosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                followingCount={followingCount}
                setFollowerCount={dispatch}
                setFollowingCount={dispatch}
            />
            {/* <p className='text-white-primary'>Working {user.username} 09:35:58 </p> */}

            {/* TABS */}
            <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" className="IconsTab_color">
                <Tab icon={<PhotoSizeSelectActualIcon sx={openTabs.showPhoto ? { color: "#fff" } : { color: '#696969' }} />} aria-label="photo" onClick={() => showPhotoTab(setOpenTabs({ showInformation: false, showPhoto: true }))} />
                <Tab icon={<AccountBoxIcon sx={openTabs.showInformation ? { color: "#fff" } : { color: '#696969' }} />} aria-label="information" onClick={() => showInfoTabs(setOpenTabs({ showInformation: true, showPhoto: false }))} />
            </Tabs>
            {
                openTabs.showPhoto || !openTabs.showInformation ?
                    (
                        <SimpleReactLightbox>
                            <Photos photos={photosCollection} />
                        </SimpleReactLightbox>
                    )
                    :
                    openTabs.showInformation || !openTabs.showPhoto ? (
                        <ProfileInformation
                            profile={profile}
                        />
                    ) : null
            }

            {/* <HomeIconComponent /> */}
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