import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'

const AddComment = ({ docId, comments, setComments, commentInput }) => {

    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user, user: { displayName } } = useContext(UserContext);
    const { user: {photoURL} } = useUser();
    const [comment, setComment] = useState('');


    const handleSubmitComment = (event) => {
        event.preventDefault()

        setComments([{ displayName, comment }, ...comments]) // new array with new comment, add the old comments
        setComment('') // clear the input

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }

    return (
        <div className="border-b border-black-border">
            <form
                className="flex justify-between pl-0 pr-5 mb-10"
                method="POST"
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : (event.preventDefault())}
            >
                <Link to={`/p/${user.displayName}`}>
                    <Avatar
                        className="rounded-full h-10 w-10 mt-4 ml-2"
                        src={`${photoURL}`}
                        // src={`/images/avatars/${user.displayName}.jpg`}
                    />
                </Link>
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-white-primary w-full py-5 px-4 bg-black-background outline-none mb-2"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                    maxLength="60"
                />
                <button
                    className={`text-sm font-bold text-white-primary flex items-center w-12 ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
}