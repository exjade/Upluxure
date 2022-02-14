import React, { useState, useEffect, UseContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'
import usePhotos from '../../hooks/use-photos'

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const storage = getStorage(firebase)
const firestore = getFirestore(firebase)

export default function SuggestedProfile({
    profileDocId,
    username,
    profileId,
    userId,
    LoggedInUserDocId,
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
        // if (photos) {
        //     window.location.reload()
        // }
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
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between ml-3">
                <div className="flex items-center justify-between">

                    <Avatar
                        className="rounded-full w-8 flex mr-2"
                        src={usersData}
                        alt={`${username} pic`}
                    />
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm text-white-primary ml-0.5 mr-2" >
                            {username}
                        </p>
                    </Link>
                </div>
                <button
                    // 20
                    className="text-xs font-bold bg-gray-button rounded w-16 h-8 text-center text-white-primary"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
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