import React, { useState, useContext } from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FirebaseContext from '../../context/firebase';
import '../../styles/css/menu/basic-menu.css'
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user';

/* */
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const dividerstyle = {
  width: '100%',
  maxWidth: 360,
  bgcolor: '#ffff',
};


const fontstyle = {
  color: '#fff',
  fontFamily: 'Red Hat Display',
  fontSize: '1rem',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
};

const BasicMenu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);

  const {
    user
  } = useContext(UserContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    open ?
      (
        <div className="menu-basic">
          <div className="icon_menu_basic">
            <IconButton
              open={open}
              onClose={handleClose}
              onClick={handleOpen}
              onClick={handleClose}
            >
              <MenuIcon
                className="text-white-primary" />
            </IconButton >
          </div>

          <div
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            className="menu-basic-content"
          >
            <Divider sx={dividerstyle} />
            <Link to={`/p/${user.displayName}`}>
              <MenuItem sx={fontstyle} className="basicmenu_profile">
                <PersonIcon />
                Profile
              </MenuItem>
            </Link>
            <Divider sx={dividerstyle} />
            <Link to={ROUTES.MY_ACCOUNT}>
              <MenuItem sx={fontstyle}>
                <Settings />
                My account
              </MenuItem>
            </Link>
            <Divider sx={dividerstyle} />
            <MenuItem
              onClick={() =>
                firebase.auth().signOut()
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  firebase.auth().signOut()
                }
              }}
              sx={fontstyle}
            >
              <Logout />
              Logout
            </MenuItem>
            <Divider sx={dividerstyle} />
          </div>
        </div>
      )
      :
      (

        <div className="menu-basic">
          <IconButton
            open={open}
            onClose={handleClose}
            onClick={handleOpen}
          >
            <MenuIcon className="text-white-primary" />
          </IconButton >
        </div>

      )


  )
}

export default BasicMenu
