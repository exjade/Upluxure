import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            // we have a user.. therefore we can store the user in local storage
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser)); // Convert the user object to a string and store it in local storage
                setUser(authUser);
            } else {
            // we don't have an authUser.. we can clear the user from local storage
                localStorage.removeItem('authUser');
                setUser(null);
            }

        return () => listener();
        })
    }, [firebase])

    return { user };
}

