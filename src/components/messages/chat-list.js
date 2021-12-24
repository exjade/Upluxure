import ChatUser from './chat-user'
import styles from '../../styles/modules/messenger/chat-list.module.css'
import ChatsStories from './chats-stories'

const ChatList = ({ premiumUsers, selectUser }) => {

    return (
        <>
            <div className={`${styles.header} `} >
                <div className={`${styles.wrapper}`}>
                    <div className='mt-8 flex justify-center items-center' >
                        <ChatsStories />
                    </div>
                    <div className={`${styles.chatusers}  mt-8`} >
                        {premiumUsers.map(user =>
                            <ChatUser
                                key={user.uid}
                                user={user}
                                selectUser={selectUser}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )

}
export default ChatList
