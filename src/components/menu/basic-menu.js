import React, { useState, useContext } from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FirebaseContext from '../../context/firebase';
import '../../styles/css/menu/basic-menu.css'
/* */
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
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
};

const BasicMenu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);

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
            <MenuItem sx={fontstyle} className="basicmenu_profile">
              {/* <Avatar /> */}
              Profile
            </MenuItem>
            <Divider sx={dividerstyle}/>
            <MenuItem sx={fontstyle}>
              {/* <Avatar /> */}
              My account
            </MenuItem>
            <Divider sx={dividerstyle}/>
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
              {/* <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon> */}
              Logout
            </MenuItem>

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
