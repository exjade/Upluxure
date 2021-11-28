import { useState, useEffect, useContext } from 'react';
import { getUserByUserId, getPhotos } from '../services/firebase';
import UserContext from '../context/user';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes'

export default function usePhotos() {

    let history = useHistory()

    const [photos, setPhotos] = useState(null);
    const {
        user, user: { uid: userId = '' }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId);
            let followedUserPhotos = [];
            // does the user have any following?
            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following)
            }
            // show newest photos first by dateCreated
            followedUserPhotos.sort((a, b) => b.photoId - a.photoId);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos()
    }, [userId]);

    return { photos }
}
