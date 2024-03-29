import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/css/post/header.css'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';

const Header = ({ username, docId, totalLikes, likedPhoto, handleFocus }) => {

    const {
        user: { uid: userId = '' },
    } = useContext(UserContext)
    const { firebase, FieldValue } = useContext(FirebaseContext)

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

    return (
        <>
            <div className="post__index_header flex h-4 p-4 py-12">
                <div className="flex items-center">
                    <Link to={`/p/${username}`} className="flex items-center">
                        <img
                            className="rounded-full h-16 w-16 mr-3"
                            src={`/images/avatars/cat.jpg`} // IMPORTANTE!!! CAMBIAR cat POR ${username}
                            alt={`${username} profile`}
                        />
                    </Link>
                </div>
                <div className="header__name_username flex">
                    <p className="font-bold">catcat</p> 
                     {/* username */}
                </div>

                <div className="header__actions_icons flex">
                    <div className="actions__card_star">
                        <StarBorderOutlinedIcon
                            onClick={handleToggleLiked}
                            className={`${toggleLiked ? 'text-red-like' : 'text-white-primary'}`}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    handleToggleLiked()
                                }
                            }}
                        />

                    </div>
                    <div className="actions__card_comment">
                        <ModeCommentOutlinedIcon
                            onClick={handleFocus}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleFocus()
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 py-0">
                {
                    likes > 50 ? (
                        <p className="font-bold mr-1 mt-4" >{`${likes}`} <StarRateIcon /><StarRateIcon /> </p>
                    ) : likes > 100 ? (
                        <p className="font-bold mr-1 mt-4">{`${likes}`} <StarRateIcon
                            className="text-yellow-like"
                        />
                            <StarRateIcon
                                className="text-yellow-like"
                            />
                            <StarRateIcon className="text-yellow-like"
                            />
                        </p>
                    ) : (
                        <p
                            className="font-bold mr-1 mt-4">{`${likes}`} <StarRateIcon /> </p>
                    )
                }

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
    handleFocus: PropTypes.func.isRequired,
}