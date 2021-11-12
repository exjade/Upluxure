import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'

const Login = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = (event) => { }

    useEffect(() => {
        document.title = 'Login - Upluxure';
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.png" alt="Iphone with profile"/>
            </div>
            <div className="flex flex-col w-2/5">
                <p className="text-white">I will be the form</p>
            </div>
        </div>
    )
}

export default Login
