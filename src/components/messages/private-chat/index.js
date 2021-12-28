
/* Components */
import Header from './header'
import Message from './message'
import Send from './send'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'

const PrivateChat = ({
    chat,
    setChat,
    text,
    setText,
    handleSubmit,
    setImg,
    msgs,
}) => {

    return (
        <>
            <div className={`${styles.private_header}`} >
                <Header
                    chat={chat}
                    setChat={setChat}
                />
                <Message
                    msgs={msgs}
                />
                <Send
                    text={text}
                    setText={setText}
                    handleSubmit={handleSubmit}
                    setImg={setImg}
                />
            </div>
        </>
    )
}

export default PrivateChat

