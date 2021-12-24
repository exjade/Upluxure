import React from 'react'

const PrivateChat = ({ chat, handleCloseModal, user }) => {

    // console.log(chat)
    return (
        <div className=' text-red-like w-full h-full' >
            <p>{user.username}</p>
        </div>
    )
}

export default PrivateChat
