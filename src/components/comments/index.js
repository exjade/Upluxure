import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import '../../styles/css/comments/index.css'
import AddComment from './add-comments'

const Comments = ({ username, docId, comments: allComments, posted, commentInput }) => {

    const [comments, setComments] = useState(allComments)

    return (
        <>
            <div className="post__comments p-4 pt-1 pb-4">
                {
                    comments.length >= 1 ? (
                        <p
                            className="text-sm text-gray-primary mb-1 cursor-pointer">
                            View all {comments.length} comments
                        </p>
                    ) : (
                        <></>
                    )
                }
                {
                    comments.slice(0, 3).map((item) => (
                        <p
                            key={`${item.comment}-${item.displayName}`}
                            className="mb-1"
                        >
                            <Link to={`/p/${item.displayName}`}>
                                <span className="mr-1 font-bold">{item.displayName}</span>
                                <span>{item.comment}</span>
                            </Link>
                        </p>
                    ))
                }
                <p className="text-gray-primary uppercase text-xs mt-2"> {formatDistance(posted, new Date())} ago</p>
            </div>
            <AddComment 
                docId={docId} 
                comments={comments}
                commentInput={commentInput} 
                setComments={setComments} 
                username={username}
            />
        </>
    )
}

export default Comments

Comments.propTypes = {
    username: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}