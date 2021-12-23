import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/css/post/image.css'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Image = ({ src, caption }) => {

    function zoomOut(step, animationTime, animationName) {
        step = 0.5
        animationTime = 300
        animationName = 'easeOut'
    }

    return (
        <>

            <div className="post__index_image">
                {/* en img debe ir src => src={src} */}
                <img
                    src={src}
                    alt={caption}
                    width="680"
                    height="680"
                    className="post_index_img"
                    onClick={() => zoomOut()}
                />
            </div>

        </>
    )
}

export default Image

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}