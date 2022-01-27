import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/css/post/header.css'
// import FirebaseContext from '../../context/firebase'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import {
    getFirestore,
    collection, query, where, getDocs
} from 'firebase/firestore'
const firestore = getFirestore(firebase)
const defaultImg = "https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9"

const Header = ({ username }) => {
    const [user, setUser] = useState(null)


    useEffect(() => {

        async function getUser() {
            const q = query(collection(firestore, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data().photoURL)
            });
        }
        getUser()
    }, [])

    // console.log(user)

    return (
        <>
            <div className="post__index_header flex items-center">
                <div className="flex items-center p-4">
                    <Link to={`/p/${username}`} className="flex items-center">
                        {user ? (
                            <>
                                <img
                                    className="rounded-full h-12 w-16 mr-3 object-cover"
                                    src={`${user}`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                                    // src={`/images/avatars/${username}.jpg`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                                    alt={`${username} profile`}
                                />
                            </>
                        ) :
                            user === undefined || user === '' || user === null ?
                                (
                                    <>
                                        <img
                                            className="rounded-full h-12 w-16 mr-3 object-cover"
                                            src={`${defaultImg}`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                                            // src={`/images/avatars/${username}.jpg`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                                            alt={`${username} profile`}
                                        />
                                    </>
                                ) : null}
                    </Link>
                </div>
                <div className="header__name_username flex">
                    {/* // debe ser {username} */}
                    <p className="font-bold">{username}</p>
                    <div className="rate p-4 py-0">
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