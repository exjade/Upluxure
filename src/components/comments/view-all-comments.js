import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user'
import Avatar from '@mui/material/Avatar';
import '../../styles/css/comments/view-all-comments.css'
import AddComment from './add-comments'

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
                            <Link to={`/p/${user.displayName}`} className="flex w-10 h-10 mr-3">
                                <Avatar
                                    className="rounded-full h-10 w-10 mt-4 cursor-pointer"
                                    src={`/images/avatars/${user.displayName}.jpg`}
                                >

                                </Avatar>
                            </Link>
                        </div>
                        <div
                            key={`${item.comment}-${item.displayName}`}
                            className="flex text-white-primary capitalize mb-1 flex-col"
                        >
                            <Link to={`/p/${item.displayName}`}>
                                <span className="flex mr-1 mt-1 font-bold">{item.displayName}:</span>
                            </Link>
                            <span className="breakwordbug flex text-justify">{item.comment}</span>
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
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
}