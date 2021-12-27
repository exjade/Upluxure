import ChatUser from '../chat-user'
import styles from '../../styles/modules/messenger/chat-list.module.css'
import ChatsStories from '../chats-stories'


const ChatList = ({ premiumUsers, selectUser, chat }) => {



    return (
        <>
            <div className={`${styles.header} `} >
                <div className={`${styles.wrapper}`}>
                    <div className='items-center mt-8 flex justify-center max-w-screen-lg w-full' >
                        <ChatsStories />
                    </div>
                    <div className={`${styles.chatusers}  mt-8  max-w-screen-lg `} >
                        {premiumUsers.map(user =>
                            <>
                                <ChatUser
                                    key={user.uid}
                                    user={user}
                                    selectUser={selectUser}
                                    chat={chat}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}
export default ChatList
