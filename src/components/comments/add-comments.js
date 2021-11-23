import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import Avatar from '@mui/material/Avatar';
import Comments from '.';

const AddComment = ({ username, docId, comments, setComments, commentInput }) => {

    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);

    const [comment, setComment] = useState('');


    const handleSubmitComment = (event) => {
        event.preventDefault()

        setComments([{displayName, comment}, ... comments]) // new array with new comment, add the old comments
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
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5 mb-20"
                method="POST"
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : (event.preventDefault())} 
            >
            <Avatar 
                className="rounded-full h-10 w-10 mt-4 ml-2"
                src={`/images/avatars/yeiner.jpg`}
            />
            <input 
                aria-label="Add a comment"
                autoComplete="off"
                className="text-sm text-white-primary w-full mr-3 py-5 px-4 bg-black-background outline-none"
                type="text"
                name="add-comment"
                placeholder="Add a comment..."
                value={comment}
                onChange={({target}) => setComment(target.value)}
                ref={commentInput}
            />
            <button
                className={`text-sm font-bold text-white-primary ${!comment && 'opacity-25'}`}
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