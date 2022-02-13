import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'
import usePhotos from '../../hooks/use-photos'
import styles from '../../styles/modules/suggestions/Suggested-profiles.module.css'
import '../../styles/modules/suggestions/suggestions_card.css'

/* Material UI */
import PushPinIcon from '@mui/icons-material/PushPin';

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const imgDefault = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fimg_569204.png?alt=media&token=68cc343c-7f75-4bce-83c0-6a8a9be7912f'

export default function SuggestedProfile({
    profileDocId,
    username,
    profileId,
    userId,
    LoggedInUserDocId,
    AboutMe,
    following,
    followers,
}) {
    const [followed, setFollowed] = useState(false)
    const { photos } = usePhotos();


    async function handleFollowUser() {
        setFollowed(true)
        // 0) create 2 functions
        // 1) update following array if the actual user
        await updateLoggedInUserFollowing(LoggedInUserDocId, profileId, false)
        // 2) update followers array of the user who has been followed
        await updateFollowedUserFollowers(profileDocId, userId, false)
        if (photos) {
            window.location.reload()
        }
    }

    /*PERFIL DE OTROS USUARIOS*/
    const [usersData, setUsersData] = useState()
    let userData = []

    useEffect(() => {
        async function getProfilePicture() {
            const docRef = doc(firestore, "users", profileDocId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                userData.push(docSnap.data().photoURL)
                setUsersData(userData.toString())
            } else {
                console.log("No such document!");
            }
        }
        getProfilePicture()
    }, [])

    return (
        // !followed ? (
        //     <div className="flex flex-row items-center align-items justify-between ml-3">
        //         <div className="flex items-center justify-between">
        //             <Avatar
        //                 className="rounded-full w-8 flex mr-2"
        //                 src={usersData}
        //                 alt={`${username} pic`}
        //             />
        //             <Link to={`/p/${username}`}>
        //                 <p className="font-bold text-sm text-white-primary ml-0.5 mr-2" >
        //                     {username}
        //                 </p>
        //             </Link>
        //         </div>
        //         <button
        //             // 20
        //             className="text-xs font-bold bg-gray-button rounded w-16 h-8 text-center text-white-primary"
        //             type="button"
        //             onClick={handleFollowUser}
        //         >
        //             Follow
        //         </button>
        //     </div>
        // ) : (
        //     null
        // )
        !followed ? (
            <div className="flex flex-row items-center align-items justify-center">
                {/* Background and Avatar */}

                <div className={`${styles.background}`} >
                    {
                        usersData === undefined || usersData === '' || usersData === null ? (
                            <div className={`${styles.avatar_background}`}>
                                <div className={styles.background_image_nouser}></div>
                            </div>
                        ) : (

                            <div className={`${styles.avatar_background}`}>
                                <img src={usersData} alt="background" className={styles.background_image} />
                            </div>
                        )
                    }
                    <Link to={`/p/${username}`}>
                        <div className={`${styles.avatar}`} >
                            {
                                usersData === undefined || usersData === '' || usersData === null ? (
                                    <img
                                        className={`${styles.noimage} rounded-full w-20 h-20 flex`}
                                        src={imgDefault}
                                        alt={`${username} pic`}
                                    />
                                ) :
                                    (

                                        <img
                                            className="rounded-full w-20 h-20 flex"
                                            src={usersData}
                                            alt={`${username} pic`}
                                        />
                                    )
                            }
                        </div>
                    </Link>
                    {/* Username, Info, Description */}
                    <div className={`${styles.user_card} mb-3`} >
                        <Link to={`/p/${username}`}>
                            <p className={styles.username} >
                                {username}
                            </p>
                        </Link>
                        <p className={`${styles.AboutMe} italic `} >
                            {
                                AboutMe === undefined || AboutMe === '' || AboutMe === null ? (
                                    <p>No description</p>
                                ) :
                                    AboutMe.length > 15 ? (
                                        <>
                                            {`${AboutMe?.substring(0, 26)} ...`}
                                        </>
                                    ) :
                                        (
                                            <>
                                                {`${AboutMe?.substring(0, 26)}`}
                                            </>
                                        )
                            }
                        </p>

                        {/* Followers & Following */}
                        <div className={`${styles.container_follows}`} >
                            <div>
                                <span>
                                    <p className={styles.follow}>{following?.length}</p>
                                    <p className={styles.title_follow} >Following</p>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <p className={styles.follow}>{followers?.length}</p>
                                    <p className={styles.title_follow} >Followers</p>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <p className={styles.follow}>{photos?.length}</p>
                                    <p className={styles.title_follow} >Post</p>
                                </span>
                            </div>
                        </div>
                        {/* Follow Button */}
                        <div>
                            <button
                                // 20
                                className="text-small font-normal bg-gray-button rounded-lg w-40 h-10 text-center text-white-primary"
                                type="button"
                                onClick={handleFollowUser}
                            >
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            null
        )
    )
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string,
    username: PropTypes.string,
    profileId: PropTypes.string,
    userId: PropTypes.string,
    LoggedInUserDocId: PropTypes.string
}