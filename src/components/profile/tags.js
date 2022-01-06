import styles from '../../styles/modules/profile/Tags.module.css'
import UseUser from '../../hooks/use-user'

const Tags = ({
    profile: {
        tag,
        tag2,
        tag3,
        username: profileUsername
    }
}) => {
    const { user } = UseUser()
    const tagsNotMine = user.username && user.username !== profileUsername

    return (
        <>
            <div className='flex flex-row gap-5' >
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tag : tag } </p>
                </div>
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tag2 : tag2 } </p>
                </div>
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tag3: tag3 } </p>
                </div>
            </div>
        </>
    )
}

export default Tags
