import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/header.css'
import FirebaseContext from '../context/firebase'; // sign and signout functions
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

/* Material UI*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from '@mui/material/IconButton';

const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    // console.log('user', user)

    return (
        <header className="h-16 border-b  mb-5">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    {/* Left */}
                    <div className="text-gray-primary text-center flex items-center align-items cursor-pointer" >
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="instagram logo">
                                <img src="/images/users/logo.png" alt="Upluxure" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    {/* Right */}
                    <div className="text-center text-white-primary flex items-center align-items">
                        {
                            user ?
                                (
                                    <>
                                        <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                            <IconButton>
                                                <HomeOutlinedIcon className="text-white-primary" />
                                            </IconButton>
                                        </Link>

                                        <button
                                            type="button"
                                            title="Sign Out"
                                            onClick={() => 
                                                firebase.auth().signOut()
                                            }
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    firebase.auth().signOut()
                                                }
                                            }}
                                            
                                        >
                                            <LogoutOutlinedIcon className="text-white-primary" />
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Link to={ROUTES.LOGIN} aria-label="Log in button">
                                            <button
                                                type="button"
                                                className="bg-brown-button font-bold text-sm rounded w-20 h-8 text-center text-white-primary"
                                            >
                                                Log In
                                            </button>
                                        </Link>
                                        <Link to={ROUTES.SIGN_UP} aria-label="Sign Upbutton">
                                            <button
                                                type="button"
                                                className="font-bold text-sm rounded text-gray-primary w-20 h-8 "
                                            >
                                                Sign Up
                                            </button>
                                        </Link>
                                    </>
                                )
                        }
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
