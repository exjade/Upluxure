import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user'
import Avatar from '@mui/material/Avatar';
import '../../styles/css/comments/view-all-comments.css'
import AddComment from './add-comments'
import StarRateIcon from '@mui/icons-material/StarRate';

const ViewAllComments = ({ username, comments: allComments }) => {

    const [comments, setComments] = useState(allComments)

    const { user } = useContext(UserContext)
    
    return (

        <div className=" bg-black-background">
            <p className="font-bold text-white-primary mt-2 mb-8">{comments.length} comments</p>
            {
                comments.map((item, index) => (
                    <div key={index} className="viewallcomments__container flex items-center justify-start content-between">
                        <div className="view_comments_avatar mb-8">
                            <Link to={`/p/${user.displayName}`} className="flex w-3 h-3 mr-12">
                                <Avatar
                                    className="rounded-full h-3 w-3 mt-4 cursor-pointer"
                                    src={`/images/avatars/${user.displayName}.jpg`}
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
                        <div className="viewallcomments__like_star">
                            <StarRateIcon className="text-white-primary" />
                            {/* CANTIDAD DE LIKES */}
                            <p className="text-white-primary font-extralight text-sm">3864</p> 
                        </div>
                    </div>
                ))
            }
            <AddComment
                username={username}
                className="mb-1"
            />
        </div>
    )
}

export default ViewAllComments

ViewAllComments.propTypes = {
    username: PropTypes.string.isRequired,
    comments: PropTypes.array,
}