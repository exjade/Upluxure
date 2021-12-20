import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/css/header.css'
import UserContext from '../../context/user';
import * as ROUTES from '../../constants/routes';
import BasicMenu from '../menu/basic-menu'


const Header = () => {

    const { user } = useContext(UserContext);

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 701);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])

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
                                        {
                                            !isDesktop ? (
                                                <BasicMenu className="mobile_menu" />
                                            ) :
                                                (
                                                    <>
                                                        <BasicMenu />
                                                    </>
                                                )
                                        }
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Link to={ROUTES.LOGIN} aria-label="Log in button">
                                            <button
                                                type="button"
                                                className="bg-gray-button font-bold text-sm rounded w-20 h-8 text-center text-white-primary"
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
