import { useState } from 'react'
import PropTypes from 'prop-types'
// import { formatDistance } from 'date-fns'
import styles from '../../styles/css/comments/Comments.module.css'
import AddComment from './add-comments'

/**/
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ViewAllComments from './view-all-comments';

const Comments = ({
    username,
    docId,
    comments: allComments, posted, commentInput
}) => {

    const [comments, setComments] = useState(allComments)
    const [open, setOpen] = useState(false)



    return (
        <>
            <div
                className={`${styles.post__comments} p-2`}
            >
                {
                    comments.length >= 1 ? (
                        <>
                            <p
                                className="flex justify-center text-sm text-gray-primary cursor-pointer mb-3"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => setOpen(true)}
                            >
                                View all comments ({comments.length})
                            </p>
                            <SwipeableDrawer
                                anchor="bottom"
                                open={open}
                                onClose={() => setOpen(false)}
                                onOpen={() => { }}
                            >
                                <div className={styles.box_comments}>
                                    <Box
                                        textAlign="center"
                                        className={`${styles.mobile__comments} p-3 bg-black-background`}
                                    >
                                        <ViewAllComments
                                            docId={docId}
                                            comments={comments}
                                            setComments={setComments}
                                            username={username}
                                        />
                                    </Box>
                                </div>
                            </SwipeableDrawer>
                        </>
                    ) : (
                        <p
                            className="text-sm text-gray-primary text-center justify-center items-center mb-4"
                        >
                            No new comments
                        </p>
                    )
                }

                {/* {

                    comments.slice(0,1).map((item) => (
                        <div key={`${item.comment}-${item.displayName}`}>

                            <div

                                className={`${styles.comments_index} flex mb-1`}
                            >
                                <div className={`${styles.comments__avatar} flex items-center`}>
                                    <Link to={`/p/${item.displayName}`} >
                                        <Avatar
                                            className="rounded-full cursor-pointer avatarincomments"
                                            src={`/images/avatars/${item.displayName}.jpg`}
                                        >

                                        </Avatar>
                                    </Link>
                                </div>
                                <div className={`${styles.comments__comment} flex items-start justify-center content-center ml-4 flex-col`}>
                                    <Link to={`/p/${item.displayName}`} className={styles.comments_displayname} >
                                        <span className="mr-1 font-bold">{item.displayName}</span>
                                    </Link>
                                    <span >{item.comment}</span>
                                </div>
                            </div>
                        </div>
                    ))

                } */}

                {/* <p className="text-gray-primary uppercase text-xs mt-2 flex justify-center"> {formatDistance(posted, new Date(), { addSuffix: true })}</p> */}
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