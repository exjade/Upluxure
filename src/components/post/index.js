import { useRef }  from 'react'
import PropTypes from 'prop-types'
import Header from './header'

const Post = ( {content} ) => {

    //Components
    // => Header, Image, actions (like, comment icons), footer, comments
    

    return (
        <div className="rounded col-span-4 border bg-black-background border-gray-primary mb-16">
            <Header username={content.username} />
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