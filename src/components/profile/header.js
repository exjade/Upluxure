import React, { useState, useEffect } from 'react'
import * as ROUTES from '../../constants/routes'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import styles from '../../styles/modules/profile/Header.module.css'
import '../../styles/css/profile/profile-information.css'

import Tags from './tags'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import { Link, useHistory } from 'react-router-dom'
import EditProfile from '../settings/edit-profile'

/* */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Header = ({
    PhotosCount,
    followerCount,
    setFollowerCount,
    followingCount,
    setFollowingCount,
    profile,
    profile: {
        photoURL,
        fullName,
        following = [],
        followers = [],
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername
    }
}) => {
    const history = useHistory()
    const { user } = useUser(); // Information about the user 
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername; // If the user is logged in and is not the profile owner
    const activeBtnEditProfile = user.username && user.username === profileUsername; // if the user is logged in and is the profile owner

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }

    }, [user.username, profileUserId])

    /* MODAL */
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            {/* Image and username */}
            <div className='grid justify-center mx-auto max-w-screen-lg'>
                <div className="container flex justify-center mt-5 items-center">
                    <div className='flex justify-center mr-8'>
                        {
                            user.username && (

                                photoURL === '' ? (
                                    <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9" height="100" width="100" />
                                ) : (
                                    <img
                                    className={`${styles.img} rounded-full h-28 w-28 flex`}
                                    alt={`${user.username} profile picture`}
                                    src={`${photoURL}`}
                                    // src={`/images/profile/${profileUsername}.jpg`}
                                />
                                )

                             
                            )
                        }
                    </div>
                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="container flex flex-col">
                            <p className={`${styles.headerusername} text-2xl text-white-primary font-medium`} >{profileUsername}</p>
                            <div className="container flex mt-2">
                                <p className="font-medium text-white-primary ">
                                    {!fullName ? (
                                        <Skeleton count={1} height={24} />
                                    ) : fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mx-auto max-w-screen-lg items-center'>
                <div className="container flex justify-center mt-5 items-center">
                    {followerCount === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>

                            {/* <p className="mr-10 text-white-primary">
                                <span className='font-bold text-2xl'> {PhotosCount} </span>
                                photos
                            </p> */}
                            <div className="mr-5 text-white-primary flex flex-col items-center tracking-wider">
                                <span className={`${styles.divfollowing} font-bold text-3xl`}  >
                                    {
                                        followerCount > 999 ?
                                            (`${followerCount}K`)
                                            :
                                            followerCount > 999999 ?
                                                (`${followerCount}M`)
                                                :
                                                (`${followerCount}`)
                                    }
                                </span>{` `}
                                <p className={`${styles.following} text-base`} >{followerCount === 1 ? 'Follower' : 'Followers'}</p>
                            </div>

                            {/* border */}
                            <div className={`${styles.border} mr-5`}></div>

                            <div className="mr-5 text-white-primary flex flex-col items-center tracking-wider">
                                <span className={`${styles.divfollowing} font-bold text-3xl`} >
                                    {
                                        following.length > 999 ?
                                            (`${following.length}K`)
                                            :
                                            following.length > 999999 ?
                                                (`${following.length}M`)
                                                :
                                                (`${following.length}`)
                                    }
                                </span>
                                <p className={`${styles.following} text-base `} >Following</p>
                            </div>

                            {/* border */}
                            <div className={`${styles.border} mr-5`}></div>

                            {activeBtnFollow && (
                                <button
                                    className={`${styles.followbtn} text-white-primary font-bold rounded w-20 h-8`}
                                    type='button'
                                    onClick={handleToggleFollow}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleToggleFollow()
                                        }
                                    }}
                                >
                                    {isFollowingProfile ? 'Following' : 'Follow'}
                                </button>
                            )}
                            {activeBtnEditProfile && (
                                <button
                                    className={`${styles.followbtn} text-white-primary font-bold rounded w-20 h-8`}
                                    type='button'
                                    onClick={() => {
                                        handleOpenModal()
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleOpenModal()
                                        }
                                    }}
                                >
                                    <p className=""> Edit Profile</p>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={`${styles.parent} grid mx-auto max-w-screen-lg`} >
                <div className={`${styles.child} flex gap-3 justify-center mt-5 items-center`} >
                    <Tags profile={profile} />
                </div>
            </div>

            {/* MODAL */}
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={styles.modal}
                >
                    <Box sx={style}>
                        <EditProfile profile={profile} handleCloseModal={handleCloseModal}/>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default Header

Header.propTypes = {
    PhotosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    followingCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    setFollowingCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        username: PropTypes.string,
    }).isRequired
}
