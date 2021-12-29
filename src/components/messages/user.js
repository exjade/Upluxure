import { useEffect, useState } from 'react'
/* Styles */
import styles from '../../styles/modules/messenger/user.module.css'
import '../../styles/modules/messenger/user.css'
/* Material UI */
import EmailIcon from '@mui/icons-material/Email';
/* Firebase */
import { firebase } from '../../lib/firebase'
import {
    getFirestore,
    onSnapshot,
    doc,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Img = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9'

const User = ({
    user,
    selectUser,
    CurrentLoggedInUser,
}) => {

    //Get the last message
    const notCurrentLoggedInUser = user?.userId
    const id = CurrentLoggedInUser > notCurrentLoggedInUser ?
        `${CurrentLoggedInUser}${notCurrentLoggedInUser}`
        :
        `${notCurrentLoggedInUser}${CurrentLoggedInUser}`
    const [data, setData] = useState('')
    useEffect(() => {
        let unsub = onSnapshot(doc(firestore, 'lastMessages', id), doc => {
            setData(doc.data())
        })
        return () => unsub()
    }, [])

    return (
        <>
            <div
                className={styles.container}
                onClick={() => selectUser(user)}
            >
                <div
                    className={`${styles.avatar} avatar_size `}
                >
                    <img
                        src={
                            user.photoURL < 1 ? Img : user.photoURL}
                        alt={user.displayName}
                        className={`
                        ${styles.avatar_user} `}
                    />
                    <div className={` ${styles.avatar_user}  ${styles.status} ${user.isOnline ? 'Online-border' : 'Offline-border'}`} ></div>
                </div>
                {data?.from !== CurrentLoggedInUser && data?.unread && (
                    <small className={`${styles.unread} animate-pulse text-white-normal cursor-pointer`} ><EmailIcon /></small>
                )}
            </div>
        </>
    )
}

export default User
