import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Avatar from '@mui/material/Avatar';
import '../../styles/css/suggestions-user.css'

const User = ({ username, fullName }) =>
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 grap-4 mb-6 items-center justify-between ml-3">
            <div className="suggestions___user_img">
                <Avatar
                    className="rounded-full w-16 flex mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
            </div>
            <div className="suggestions_user_name col-span-3">
                <p className="font-bold text-sm text-white-primary">{username}</p>
                <p className="text-sm text-white-primary">{fullName}</p>
            </div>
        </Link>
    )

export default User;

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
}
