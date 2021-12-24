import React, { useEffect, useState } from 'react'
/* Styles */
import styles from '../../styles/modules/messenger/chat-user.module.css'
import '../../styles/css/messenger/chat-user.css'
/* Components */
import PrivateChat from './private-chat/'
/* Material UI */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const Img = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ChatUser = ({ user, selectUser, chat }) => {

    /* Modal */
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>

            <div
                className={`${styles.container} cursor-pointer`}
                onClick={() => selectUser(user)}
                onClick={() => {
                    handleOpenModal()
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleOpenModal()
                    }
                }}
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

            {/* MODAL */}
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-describedby="chat-user-modal"
                    // className={styles.modal}
                    className={`${styles.modal_design}`}
                >
                    <Box sx={style}>
                        <PrivateChat
                            user={user}
                            chat={chat}
                            handleCloseModal={handleCloseModal} />
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ChatUser
