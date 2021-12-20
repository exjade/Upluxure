import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/css/post/header.css'
import useUser from '../../hooks/use-user'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, updateDoc, getDoc, doc, query, where, getDocs  } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Header = ({ username, docId, totalLikes, likedPhoto }) => {
    const {
        user, user: { uid: userId = '' }
    } = useContext(UserContext)
    const { firebase, FieldValue } = useContext(FirebaseContext)
    // console.log(user)
    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [likes, setLikes] = useState(totalLikes)

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
            })
        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    }

    const {
        user: {
            fullName,
            photoURL,
            token,
            Country,

        } } = useUser()

    // I need to get photoURL from username !== user.username
    const getPhotoURL = async () => {

        const q = query(collection(firestore, "users"), where("photoURL", "!=", photoURL));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });


    }


    return (
        <>
            <div className="post__index_header flex items-center">
                <div className="flex items-center p-4">
                    <Link to={`/p/${username}`} className="flex items-center">
                        <img
                            className="rounded-full h-12 w-16 mr-3 object-cover"
                            src={`/images/avatars/${username}.jpg`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                            alt={`${username} profile`}
                        />
                    </Link>
                </div>
                <div className="header__name_username flex">
                    {/* // debe ser {username} */}
                    <p className="font-bold">{username}</p>
                    <div className="rate p-4 py-0">
                        {/* {
                            likes === 50 ? (
                                <p className="rate_star font-bold mr-1" >{likes}
                                    <StarRateIcon />
                                    <StarRateIcon />
                                </p>
                            ) : likes > 99 ? (
                                <p className="rate_star font-bold mr-1">{likes}
                                    <StarRateIcon className="text-red-like" />
                                    <StarRateIcon className="text-red-like" />
                                    <StarRateIcon className="text-red-like" />
                                </p>
                            ) : (
                                <p className="rate_star font-bold mr-1" >{likes}
                                    <StarRateIcon />
                                </p>
                            )
                        } */}
                        <IconButton className="header_more_info w-4 h-4">
                            <MoreVertIcon className="header_more_info text-white-primary w-4 h-4" />
                        </IconButton>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Header

Header.propTypes = {
    username: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
}