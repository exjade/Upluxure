import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import '../styles/css/login.css'
import * as ROUTES from '../constants/routes'

const Login = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress('')
            setPassword('')
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Login - Upluxure';
    }, [])

    return (
        <>
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
                <div className="flex w-3/5">
                    <img src="/images/iphone-with-profile.png" alt="Iphone with profile" />
                </div>
                <div className="flex flex-col w-2/5">
                    <div className="flex flex-col">
                        <div className="login_title white.primary">
                            <h1>Uncensored Social Network</h1>
                        </div>
                        <h1 className="flex justify-center w-full">
                            <img src="/images/users/logo.png" alt="Upluxure Logo" className="mt-2 w-6/12 mb-4" />
                        </h1>

                        {error && <p className="mb-4 text-xs error">{error}</p>}

                        <form onSubmit={handleLogin} method="POST" >
                            <input
                                aria-label="Enter your email address"
                                type="text"
                                placeholder="Email"
                                className="form__email"
                                onChange={({ target }) => setEmailAddress(target.value)}
                            />
                            <input
                                aria-label="Enter your password"
                                type="password"
                                placeholder="Password"
                                className="form__password"
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={`form_button ${isInvalid && 'opacity-70'}`}
                            >Log in</button>
                        </form>
                    </div>
                    <div className="form_create_account">
                        <p className="">Don't have an account? {``} </p>
                        <Link to={ROUTES.SIGN_UP} className="form_create_account_signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
