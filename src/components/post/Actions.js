import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/css/post/Actions.module.css'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const Actions = ({ username, docId, totalLikes, likedPhoto, handleFocus, comments }) => {

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
            <div className={`${styles.post__index_header} flex items-center`} >
        
                <div className={styles.header__actions_icons} >
                    <div className={styles.actions__card_star} >
                        {
                            toggleLiked ? (
                                <StarRateIcon
                                onClick={handleToggleLiked}
                                className="star_size text-red-like"
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        handleToggleLiked()
                                    }
                                }}
                            />
                            ) : (
                                <StarBorderIcon
                                onClick={handleToggleLiked}
                                className="star_size text-white-primary"
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        handleToggleLiked()
                                    }
                                }}
                            />
                            )
                        }
                      
                        <p className={styles.star_likes} >{likes}</p>
                    </div>
                    <div className={styles.actions__card_comment} >
                        <ModeCommentOutlinedIcon
                            onClick={handleFocus}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleFocus()
                                }
                            }}
                            className={`comments_size ${comments.length > 1 ? 'text-red-like' : 'text-white-primary'}`}
                        />
                        <p className={styles.comment_count} >{comments.length}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Actions

Actions.propTypes = {
    username: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
}