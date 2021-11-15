import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase'; // sign and signout functions
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';



const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    // console.log('user', user)

    return (
        <header className="h-16 border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">

                    <div className="text-gray-primary text-center flex items-center align-items cursor-pointer" >
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="instagram logo">
                                <img src="/images/users/logo.png" alt="Upluxure" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-center flex items-center align-items">

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
