import React from 'react'
/* Components */
import Header from '../components/messages/private-chat/header'
import Message from '../components/messages/private-chat/message'
import Send from '../components/messages/private-chat/send'
/* Styles */
import styles from '../styles/modules/messenger/private-chat/private-chat.module.css'

const PrivateChat = ({ chat, handleCloseModal, user }) => {

    // console.log(chat)
    return (
        <>
            <div className=' max-w-screen-lg w-full '>
                <Header user={user} handleCloseModal={handleCloseModal} />
                <Message />
                <Send />
            </div>
        </>
    )
}

export default PrivateChat
