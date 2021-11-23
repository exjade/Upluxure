import PropTypes from 'prop-types';
import '../../styles/css/post/footer.css'

import React from 'react'

const Footer = ({username, caption}) => {
    return (
        <div className="inline p-4 pb-5">
            <span className="capitalize mr-1 font-bold">
                {username}
            </span>
            <span>{caption}</span>
        </div>
    )
}

export default Footer

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}