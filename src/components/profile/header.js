import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { Link, useHistory } from 'react-router-dom'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import * as ROUTES from '../../constants/routes'
import ContentLoader from 'react-content-loader'
import useUser from '../../hooks/use-user'
import styles from '../../styles/modules/profile/Header.module.css'
import '../../styles/css/profile/profile-information.css'

import Tags from './tags'
import EditProfile from '../settings/edit-profile'
import UserBadge from '../memberships/badges/user'
import DiamondBadge from '../memberships/badges/diamond'
import PlatinumBadge from '../memberships/badges/platinum'
import GoldBadge from '../memberships/badges/gold'
import ModelBadge from '../memberships/badges/model'
import AdminBadge from '../memberships/badges/admin'

/*Material UI */
import Box from '@mui/material/Box';
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
    followerCount,
    setFollowerCount,
    profile,
    profile: {
        rol,
        photoURL,
        fullName,
        following = [],
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

    const [isLoading, setIsLoading] = useState(true);

    const loader = () => {
        return (
            <ContentLoader
                viewBox="0 0 850 300"
                backgroundColor="#181818"
                foregroundColor="#212121b8"
                styles={styles.loader}
            >
                <rect x="1" y="0" width="1000" height="400" />
            </ContentLoader>
        )
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1800);
    }, [])

    if (isLoading) {
        return loader()
    } else {

        return (
            <>
                {/* Image and username */}
                <div className='grid justify-center mx-auto max-w-screen-lg'>
                    <div className="container flex justify-center mt-5 items-center">
                        <div className='flex justify-center flex-col mr-4'>
                            {
                                user.username && (

                                    photoURL === '' ? (
                                        <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9" height="100" width="100" />
                                    ) : (
                                        <>
                                            <img
                                                className={`${styles.img} rounded-full h-28 w-28 flex 
                                            ${rol === 'diamond' ?
                                                        'border-4 border-badges-diamond'
                                                        :
                                                        rol === 'platinum' ? 'border-4 border-badges-platinum'
                                                            :
                                                            rol === 'gold' ? 'border-4 border-badges-gold'
                                                                :
                                                                rol === 'admin' ? 'border-4 border-badges-admin'
                                                                    :
                                                                    rol === 'model' ? 'border-4 border-badges-model'
                                                                        : null}`}
                                                alt={`${user.username} profile picture`}
                                                src={`${photoURL}`}
                                            />

                                            <div className={`${styles.roles}`}>
                                                {
                                                    rol === 'diamond' ?
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fbadge_roles%2Fdiamond.png?alt=media&token=36ab1cd8-f9b5-49ca-a708-d55f199c7d3a" />
                                                        : rol === 'platinum' ?
                                                            <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fbadge_roles%2Fplatinum.png?alt=media&token=c4bf4abb-8c53-41ff-884d-85437a56c94e" />
                                                            : rol === 'gold' ?
                                                                <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fbadge_roles%2Fgold.png?alt=media&token=6e38a7c1-2fb2-44ee-b3ed-3bb4f1dd27df" />
                                                                : rol === 'admin' ?
                                                                    <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fbadge_roles%2Fadmin.png?alt=media&token=4fcf7675-f9b8-4800-814a-a61b75d9ae42" />
                                                                    : <div className='mb-8'></div>
                                                }
                                            </div>
                                        </>
                                    )


                                )
                            }
                        </div>
                        <div className="flex items-center justify-center flex-col col-span-2">
                            <div className="container flex flex-col">
                                <p className={`${styles.headerusername} text-2xl text-white-primary font-medium`} >
                                    {profileUsername}
                                </p>
                                {
                                    rol === 'free' ?
                                        <UserBadge />
                                        : rol === 'diamond' ?
                                            <DiamondBadge />
                                            : rol === 'platinum' ?
                                                <PlatinumBadge />
                                                : rol === 'gold' ?
                                                    <GoldBadge />
                                                    : rol === 'model' ?
                                                        <ModelBadge />
                                                        : rol === 'admin' ?
                                                            <AdminBadge />
                                                            : null

                                }
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
                            <EditProfile profile={profile} handleCloseModal={handleCloseModal} />
                        </Box>
                    </Modal>
                </div>
            </>
        )
    }
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
