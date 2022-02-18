import PropTypes from 'prop-types';
import '../../styles/css/post/footer.css'
import { formatDistance } from 'date-fns'

import React from 'react'

const Footer = ({
    posted,
    username,
    caption }) => {
    return (

        <div className="inline p-4 pb-5">
            {/* <span className="capitalize mr-1 font-bold">
            {username}
        </span> */}
            {
                caption ? (
                    <span className='footer__in_caption' ><b className='capitalize'>{username}:</b> {caption}</span>
                ) : (
                    null
                )
            }
            <p className="text-gray-primary uppercase text-xs mt-2 flex justify-center"> {formatDistance(posted, new Date(), { addSuffix: true })}</p>
        </div>



    )
}

export default Footer

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    posted: PropTypes.number.isRequired,
}