import { useState } from 'react'
import User from './user'
import PrivateChat from './private-chat/'
// import SearchBar from './searchbar'
import styles from '../../styles/modules/messenger/active-users.module.css'

const ActiveUsers = ({
    premiumUsers,
    selectUser,
    chat,
    setChat,
    text,
    setText,
    handleSubmit,
    setImg,
    msgs,
    CurrentLoggedInUser,
}) => {


    return (
        <>
            <div className='flex flex-row'>
                <div className={`${styles.header}`} >
                    {
                        chat ? (
                            <></>
                        )
                            :
                            (
                                <>
                                    <div className={styles.wrapper} >
                                        {premiumUsers.slice(0, 10).map(user =>
                                            <User
                                                key={user.username}
                                                user={user}
                                                selectUser={selectUser}
                                            />)}
                                    </div>
                                </>
                            )
                    }
                </div>
                <div className={`${styles.privatechat} text-white-normal`}>
                    {chat ? (
                        <>

                            <PrivateChat
                                chat={chat}
                                key={premiumUsers.userId}
                                setChat={setChat}
                                text={text}
                                setText={setText}
                                handleSubmit={handleSubmit}
                                setImg={setImg}
                                msgs={msgs}
                                CurrentLoggedInUser={CurrentLoggedInUser}
                            />


                        </>
                    )
                        :
                        (
                            <>
                                {/* <div className={styles.start_conversation} >
                                    <h3>Select a user to start a conversation</h3>
                                </div> */}
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )

}
export default ActiveUsers
