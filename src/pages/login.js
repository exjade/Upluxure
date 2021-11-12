import React, { useState ,useContext, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import FirebaseContext from '../context/firebase'

const Login = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [ emailAddress, setEmailAddress] = useState('');
    const [ password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = (event) => {}

    useEffect( () => {
        document.title = 'Login - Upluxure';
    }, [])
    
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <p>I have no idea</p>
        </div>
    )
}

export default Login
