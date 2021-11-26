import React, { useState, useEffect, useContext } from 'react';
import '../styles/css/searchbardown.css'
import { Link } from 'react-router-dom';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase'; // sign and signout functions
import * as ROUTES from '../constants/routes';

/* Mateial */
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ButtonBase from '@mui/material/ButtonBase';


const SearchBarDown = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 840);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])


    /* SpeedDial - ICONS */
    const actions = [
        { icon: <InsertPhotoIcon sx={{ color: 'black' }} />, name: 'Library' },
        { icon: <PhotoCameraIcon sx={{ color: 'black' }} />, name: 'Camera' },
        { icon: <VideocamIcon sx={{ color: 'black' }} />, name: 'Video' }
    ];


    return (
        <>
            {
                user && !isDesktop ?
                    (
                        <>
                            <div className="homesearch__card">
                                <div className="homesearchbar__dashboard">
                                    <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                        <ButtonBase>
                                            <HomeIcon />
                                        </ButtonBase>
                                    </Link>
                                </div>
                                <div className="homesearchbar__search">
                                    <ButtonBase >
                                        <SearchIcon />
                                    </ButtonBase>
                                </div>
                                <div className="homesearchbar__add">
                                    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 2 }}>
                                        <Backdrop open={open} />
                                        <SpeedDial
                                            ariaLabel="SpeedDial Home"
                                            className="speed-dial"
                                            icon={<SpeedDialIcon />}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            open={open}
                                        >
                                            {actions.map((action) => (
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={handleClose}
                                                >
                                                </SpeedDialAction>
                                            ))}
                                        </SpeedDial>
                                    </Box>
                                </div>
                                <div className="homesearchbar__notifications">
                                    <ButtonBase>
                                        <NotificationsIcon
                                        />
                                    </ButtonBase>
                                </div>
                                <div className="homesearchbar__search">
                                    <Link to={`/p/${user.displayName}`}>
                                        <Avatar
                                            src={`/images/avatars/${user.displayName}.jpg`}
                                            alt={`${user.displayName} profile picture`}
                                        />
                                    </Link>
                                </div>

                            </div>
                        </>
                    )
                    :
                    (
                        <>
                        </>
                    )
            }
        </>
    )
}

export default SearchBarDown
