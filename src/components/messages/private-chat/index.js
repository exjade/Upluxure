
/* Components */
import Header from './header'
import Message from './message'
import Send from './send'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
import SimpleReactLightbox from 'simple-react-lightbox'

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
                <SimpleReactLightbox>
                    <Message
                        msgs={msgs}
                    />
                </SimpleReactLightbox>
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

