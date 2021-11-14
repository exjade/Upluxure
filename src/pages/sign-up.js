import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import '../styles/css/signup.css'
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'

/* Material UI Icons*/
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const SignUp = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignup = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // Authenticate 
                // -> emailAddress, password & username (displayName)
                await createdUserResult.user.updateProfile({
                    displayName: username,
                })
                // firebase user collection (create a document)
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: new Date()
                })

                history.push(ROUTES.DASHBOARD)
            } catch (error) {
                setFullName('')
                setEmailAddress('')
                setPassword('')
                setUsername('')
                setError(error.message);
            }
        } else {
            setError('Username already exists, please try another')
        }
    }

    useEffect(() => {
        document.title = 'Sign Up - Upluxure';
    }, [])

    return (
        <>
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
                <div className="flex w-3/5">
                    <img src="/images/iphone-with-profile.png" alt="Iphone with profile" />
                </div>
                <div className="flex flex-col w-2/5">
                    <div className="flex flex-col">
                        <div className="signup_title white.primary">
                            <h1>Uncensored Social Network</h1>
                        </div>
                        <h1 className="flex justify-center w-full">
                            <img src="/images/users/logo.png" alt="Upluxure Logo" className="mt-2 w-6/12 mb-4" />
                        </h1>

                        {error && <p className="mb-4 text-xs error">{error}</p>}

                        <form onSubmit={handleSignup} method="POST" >
                            <input
                                aria-label="Enter your username"
                                type="text"
                                placeholder="Username"
                                className="form__signup_email"
                                onChange={({ target }) => setUsername(target.value)}
                                value={username}
                            />
                            <input
                                aria-label="Enter your Full Name"
                                type="text"
                                placeholder="Full Name"
                                className="form__signup_email"
                                onChange={({ target }) => setFullName(target.value)}
                                value={fullName}
                            />
                            <input
                                aria-label="Enter your email address"
                                type="text"
                                placeholder="Email"
                                className="form__signup_email"
                                onChange={({ target }) => setEmailAddress(target.value)}
                                value={emailAddress}
                            />
                            <input
                                aria-label="Enter your password"
                                type="password"
                                placeholder="Password"
                                className="form__signup_password"
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />

                            <div className="form__signup_terms">
                                <Checkbox>
                                    <CheckBoxIcon className=""></CheckBoxIcon>
                                </Checkbox>
                                <p className="signup_conditions_terms">I agree with conditions & terms</p>
                            </div>

                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={`form_signup_button ${isInvalid && 'opacity-80'}`}
                            >Sign up for free</button>
                        </form>
                    </div>
                    <div className="form_login_account">
                        <p className="">Already a member? {``} </p>
                        <Link to={ROUTES.LOGIN} className="form_create_account_signup">Login Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
