import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
// import '../../styles/css/post/actions.css'
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {

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
            <div className="flex justify-between p-4">
                <div className="flex">
                    <div className="actions__card_start">
                        <IconButton>
                            <StarIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Actions

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
}