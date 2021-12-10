import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import { isUserFollowingProfile } from '../../services/firebase'
import styles from '../../styles/modules/profile/Header.module.css'


/* Material UI */
import Avatar from '@mui/material/Avatar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

const Header = ({
    PhotosCount,
    followerCount,
    followingCount,
    setFollowerCount,
    setFollowingCount,
    profile: {
        fullName,
        following = [],
        followers = [],
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername
    }
}) => {

    const { user } = useUser(); // Information about the user 
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        })
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


    return (
        <>
            {/* Image and username */}
            <div className='grid justify-center mx-auto max-w-screen-lg'>
                <div className="container flex justify-center mt-5 items-center">
                    <div className='flex justify-center mr-6'>
                        {
                            user.username && (
                                <img
                                    className={`${styles.img} rounded-full h-32 w-32 flex`}
                                    alt={`${user.username} profile picture`}
                                    src={`/images/avatars/${profileUsername}.jpg`}
                                />
                            )
                        }
                    </div>
                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="container flex flex-col">
                            <p className="text-2xl text-white-primary font-medium">{profileUsername}</p>
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
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>

                            {/* <p className="mr-10 text-white-primary">
                                <span className='font-bold text-2xl'> {PhotosCount} </span>
                                photos
                            </p> */}
                            <div className="mr-5 text-white-primary flex flex-col items-center tracking-wider">
                                <span className='font-bold text-3xl'> {followers.length} </span>{` `}
                                <p className='text-lg'>{followers.length === 1 ? 'Follower' : 'Followers'}</p>
                            </div>

                            {/* border */}
                            <div className={`${styles.border} mr-5`}></div>

                            <div className="mr-5 text-white-primary flex flex-col items-center tracking-wider">
                                <span className='font-bold text-3xl'> {following.length} </span>
                                <p className='text-lg'>Following</p>
                            </div>

                            {/* border */}
                            <div className={`${styles.border} mr-5`}></div>

                            {activeBtnFollow && (
                                <button
                                    className={`${styles.followbtn} bg-white-followbtn hover:bg-blue-700 text-white-primary font-bold rounded w-20 h-8`}
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
                        </>
                    )}
                </div>
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
