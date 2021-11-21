import { useRef }  from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import '../../styles/css/post/index.css'

const Post = ( {content} ) => {

    //Components
    // => Header, Image, actions (like, comment icons), footer, comments
    

    return (
        <div className="post__index rounded col-span-4 bg-black-background mb-10">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
        </div>
    )
}

export default Post

Post.propTypes = { 
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}