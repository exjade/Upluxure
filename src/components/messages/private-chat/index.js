
/* Components */
import Header from './header'
import Message from './message'
import Send from './send'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'

const PrivateChat = ({ user }) => {

    return (
        <>
            <div className={`${styles.private_header}`} >
                <Header />
                <Message />
                <Send />
            </div>
        </>
    )
}

export default PrivateChat

