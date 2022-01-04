import React, { useState, useContext, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FirebaseContext from '../../context/firebase';
import '../../styles/css/menu/basic-menu.css'
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';

/*Material UI*/
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
/* Firebase, Firestore  */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

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

  /* Update UserStatus */
  const { user: { docId } } = useUser();

  async function updateUserStatus() {
    const statusRef = doc(firestore, "users", docId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(statusRef, {
      isOnline: false
    });
    return () => updateUserStatus()
  }


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
            <Link to={`/p/${user.displayName}`}>
              <MenuItem sx={fontstyle} className="basicmenu_profile">
                <PersonIcon />
                Profile
              </MenuItem>
            </Link>
            <Link to={ROUTES.MY_ACCOUNT}>
              <MenuItem sx={fontstyle}>
                <Settings />
                My account
              </MenuItem>
            </Link>
            <Divider sx={dividerstyle} />
            <MenuItem
              onClick={() =>
                firebase.auth().signOut().then(() => { updateUserStatus(); })
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
