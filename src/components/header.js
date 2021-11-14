import React from 'react'
import '../styles/css/header.css'

/* Material Ui */
import Avatar from '@material-ui/core/Avatar'
import Button from '@mui/material/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Header = () => {


    return (
        <div className="header__container">

            <div className="header__container_stories">
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
                <Avatar className="header__stories_avatar"></Avatar>
            </div>
        </div>
    )
}

export default Header
