import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/stories.css';
import FirebaseContext from '../context/firebase'; // sign and signout functions
import UserContext from '../context/user';

/* Material Ui */
import Avatar from '@material-ui/core/Avatar'

const Stories = () => {
    return (
        <div className="header__container">
        <div className="header__container_stories flex flex-col max-w-screen-md ">
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
            <Avatar className="header__stories_avatar" ></Avatar>
        </div>
    </div>
    )
}

export default Stories
