import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import Avatar from '@mui/material/Avatar';
import StarRateIcon from '@mui/icons-material/StarRate';
import '../../styles/css/comments/view-all-comments.css';

const ViewAllComments = ({ docId, comments, setComments }) => {

    // const [comments, setComments] = useState(allComments)
    const [comment, setComment] = useState('');
    const { user, user: {displayName} } = useContext(UserContext)
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleSubmitComment = (event) => {
        event.preventDefault()

        setComments([{ displayName, comment }, ...comments]) // new array with new comment, add the old comments
        setComment('') // clear the input

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName,  comment })
            });
    }

    return (

        <div className=" bg-black-background">
            <p className="font-bold text-white-primary mt-2 mb-8">{comments.length} comments</p>
            {
                comments.map((item, index) => (
                    <div key={index} className="viewallcomments__container flex items-center justify-start content-between">
                        <div className="view_comments_avatar mb-8">
                            <Link to={`/p/${item.displayName}`} className="flex w-3 h-3 mr-12">
                                <Avatar
                                    className="rounded-full h-3 w-3 mt-4 cursor-pointer"
                                    src={`/images/avatars/${item.displayName}.jpg`}
                                >

                                </Avatar>
                            </Link>
                        </div>

                        <div
                            key={`${item.comment}-${item.displayName}`}
                            className="flex text-white-primary capitalize mb-1 flex-col"
                        >
                            <Link to={`/p/${item.displayName}`} className="comments__displayname">
                                <span className="flex mr-1 mt-1 font-light text-ctitle-primary ">{item.displayName}:</span>
                            </Link>
                            <span className="breakwordbug font-medium flex text-justify">{item.comment}</span>
                            <div className="comments__answer">
                                <div className="flex content-start text-brown-button cursor-pointer min-w-min">View Comments
                                    <div className="comments__answer_reply">Reply</div>
                                </div>
                            </div>
                        </div>
                        <div className="viewallcomments__like_star"  key={`${index}-${item.displayName}`}>
                            <StarRateIcon
                                className="text-white-primary"
                            />
                            {/* CANTIDAD DE LIKES */}
                            <p className="text-white-primary font-extralight text-sm">385</p>
                        </div>
                    </div>
                ))
            }
            <div className="mt-2 border-b border-black-border">
                <form
                    className="flex justify-between pl-0 pr-5 mb-5"
                    method="POST"
                    onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : (event.preventDefault())}
                >
                    <Link to={`/p/${user.displayName}`}>
                        <Avatar
                            className="rounded-full h-10 w-10 mt-4 ml-2"
                            src={`/images/avatars/${user.displayName}.jpg`}
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
        </div>
    )
}

export default ViewAllComments

ViewAllComments.propTypes = {
    username: PropTypes.string.isRequired,
    comments: PropTypes.array,
    docId: PropTypes.string.isRequired,
    setComments: PropTypes.func.isRequired,
}