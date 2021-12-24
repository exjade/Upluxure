import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/modules/messenger/user.module.css'
import '../../styles/modules/messenger/user.css'
/* Material UI */


const Img = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9'

const User = ({ user }) => {

    return (
        <>

            <div className={styles.container}>
                <div className={`${styles.avatar} avatar_size `} >
                    <Avatar src={
                        user.photoURL < 1 ? Img : user.photoURL}
                        alt={user.displayName}
                        className={`
                        ${styles.avatar_size} 
                        ${user.isOnline ? 'Online-border' : 'Offline-border'}
                        `}
                    />
                </div>
            </div>
        </>
    )
}

export default User
