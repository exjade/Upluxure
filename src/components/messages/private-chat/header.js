import { useState, useEffect } from 'react'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
/* Material UI */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ chat, setChat }) => {


    console.log()
    return (
        <>
            <div className={` text-white-normal items-center flex justify-center w-full`} >
                {/* header - 1:52.11 */}

                <div className={`${styles.header_container}`} >
                    <div className={styles.header_icon} >
                        <ArrowBackIcon
                            onClick={() => setChat(false)}
                        />
                    </div>
                    <div className={`${styles.header_wrapper}`} >
                        <img
                            src={chat.photoURL}
                            alt={chat.username}
                            className={`${styles.header_avatar}`}
                        />
                        <div className={`${styles.header_text_container}`} >
                            <p className={`${styles.header_username} text-white-normal`} >
                                {chat.username}
                            </p>
                            <p className={`${styles.header_status}`} >{chat.isOnline ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className={styles.header_last}>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Header

