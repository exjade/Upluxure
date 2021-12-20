import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './Actions'
import Footer from './footer'
import Comments from '../comments/index'
import '../../styles/css/post/index.css'
import ContentLoader from 'react-content-loader'

const Post = ({ content }) => {
    const commentInput = useRef(null)
    const handleFocus = () => commentInput.current.focus();
    //Components
    // => Header, Image, actions (like, comment icons), footer, comments
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);

    }, [])

    const [isLoading, setIsLoading] = useState(true);

    const loader = () => {
        return (
            <ContentLoader viewBox="0 0 400 460" backgroundColor="#181818" foregroundColor="#272727e0" speed="2" animate="true">
                <circle cx="31" cy="31" r="15" />
                <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
                <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            </ContentLoader>
        )
    }

    if (isLoading) {
        return loader()
    } else {

        return (
            <div className="post__index rounded col-span-4 bg-black-background mb-10">
                <div className="post_container_header">
                    <Header
                        username={content.username}
                        docId={content.docId}
                        totalLikes={content.likes.length}
                        likedPhoto={content.userLikedPhoto}
                        handleFocus={handleFocus}
                    />
                </div>
                <Image src={content.imageSrc} caption={content.caption} />
                <div className="post_container_header">
                    <Actions
                        username={content.username}
                        docId={content.docId}
                        comments={content.comments}
                        totalLikes={content.likes.length}
                        likedPhoto={content.userLikedPhoto}
                        handleFocus={handleFocus}
                    />
                </div>
                <div className="post__container_caption">
                    <Footer username={content.username} caption={content.caption} />
                </div>
                <Comments
                    username={content.username}
                    docId={content.docId}
                    comments={content.comments}
                    posted={content.dateCreated}
                    commentInput={commentInput}
                />
            </div>
        )
    }
}

export default Post

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
    })
}