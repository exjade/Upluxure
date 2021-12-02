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

const BasicMenu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    open ? (
      <div className="menu-basic">
        <IconButton
          open={open}
          onClose={handleClose}
          onClick={handleOpen}
          onClick={handleClose}
        >
          <MenuIcon 
          className="text-white-primary" />
        </IconButton >

        <div
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          className="menu-basic-content"
        >

          <MenuItem >
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() =>
              firebase.auth().signOut()
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                firebase.auth().signOut()
              }
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      </div>
    ) :
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
