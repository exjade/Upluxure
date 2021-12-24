import styles from '../../styles/modules/messenger/chat-stories.module.css'

const ChatsStories = () => {
    return (
        <div className={styles.container} >
            <div className={styles.chat} >
                <p>Chats</p>
            </div>
            <div className={styles.stories} >
                <p>Stories</p>
            </div>
        </div>
    )
}

export default ChatsStories
