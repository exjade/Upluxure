import React, { useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';
/* Styles */
import styles from '../../styles/modules/messenger/chat-user.module.css'
import '../../styles/css/messenger/chat-user.css'
/* Components */
import InboxChats from '../../../pages/inbox-chats'

const Img = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9'


const ChatUser = ({ user, selectUser, chat }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>

            <div
                className={`${styles.container} cursor-pointer`}
                onClick={() => selectUser(user)}
                onClick={onOpenModal}
            >
                <div className={`${styles.chat_avatar} avatar_size `} >
                    <img
                        src={
                            user.photoURL < 1 ? Img : user.photoURL}
                        alt={user.displayName}
                        className={`
                        ${styles.chat_avatar_size} 
                        
                        `}
                    />
                </div>
                <div className={`${styles.circle_online_chat} ${user.isOnline ? 'Online-chat_user' : 'Offline_chat_user'}`} >
                </div>
                <div className={styles.username} >
                    <h4>{user.fullName}</h4>
                </div>
            </div>

        </>
    )
}

export default ChatUser
