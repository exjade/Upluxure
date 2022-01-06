import { Link } from 'react-router-dom'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
/* Material UI */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ chat, setChat }) => {
    const defaultImg = 'https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9'

    console.log()
    return (
        <>
            <div className={` text-white-normal items-center flex justify-center w-full mb-16`} >
                {/* header - 1:52.11 */}

                <div className={`${styles.header_container}`} >
                    <div className={styles.header_icon} >
                        <ArrowBackIcon
                            onClick={() => setChat(false)}
                        />
                    </div>
                    <div className={`${styles.header_wrapper}`} >
                        {
                            chat.photoURL ? (
                                <Link to={`/p/${chat.username}`} >
                                    <img
                                        src={chat.photoURL}
                                        alt={chat.username}
                                        className={`${styles.header_avatar}`}
                                    />
                                </Link>
                            ) : (
                                <Link to={`/p/${chat.username}`} >
                                    <img
                                        src={defaultImg}
                                        alt={chat.username}
                                        className={`${styles.header_avatar}`}
                                    />
                                </Link>
                            )
                        }
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

