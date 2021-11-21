import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/css/post/header.css'

const Header = ({ username }) => {
    return (
        <div className="post__index_header flex border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                <img 
                    className="rounded-full h-8 w-8 mr-3"
                    src={`/images/avatars/cat.jpg`} // IMPORTANTE!!! CAMBIAR cat POR ${username}
                    alt={`${username} profile`}
                />
                <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    )
}

export default Header

Header.propTypes = {
    username: PropTypes.string.isRequired
}