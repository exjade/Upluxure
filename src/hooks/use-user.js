import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import {getUserByUserId} from '../services/firebase'

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            // I need call firebase service that gets the user data based on the id
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if (user?.uid) {
            getUserObjByUserId(); // If user have an uid, then call this function
        }
    }, [user]);

    return { user: activeUser}
}