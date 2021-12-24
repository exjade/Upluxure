import ChatUser from './chat-user'
import styles from '../../styles/modules/messenger/chat-list.module.css'

const ChatList = ({ premiumUsers }) => {

    return (
        <>
            <div className={`${styles.header} `} >
                <div className={styles.wrapper} >
                    <div className={`${styles.chatusers}  mt-8`} >
                        {premiumUsers.map(user =>
                            <ChatUser
                                key={user.uid}
                                user={user}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )

}
export default ChatList
