import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/css/post/image.css'

const Image = ({ src, caption }) => {
    return (
        <div className="post__index_image">
            {/* en img debe ir src => src={src} */}
            <img 
                src={`/image/users/cat/2.jpg`} 
                alt={caption}
                width="680"
                height="680" 
                className="post_index_img" /> 
        </div>
    )
}

export default Image

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}