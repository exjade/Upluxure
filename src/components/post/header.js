import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/css/post/header.css'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useUser from '../../hooks/use-user'

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import {
    getFirestore,
    getDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Header = ({ username }) => {
    const { user: { uid: userId = '' } } = useContext(UserContext)



    return (
        <>
            <div className="post__index_header flex items-center">
                <div className="flex items-center p-4">
                    <Link to={`/p/${username}`} className="flex items-center">
                        <img
                            className="rounded-full h-12 w-16 mr-3 object-cover"
                            src={`${username}`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                            // src={`/images/avatars/${username}.jpg`}//  IMPORTANTE!!! CAMBIAR cat POR ${username}
                            alt={`${username} profile`}
                        />
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