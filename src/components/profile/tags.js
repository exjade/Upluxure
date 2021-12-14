import { useState } from 'react'
import styles from '../../styles/modules/profile/Tags.module.css'
/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getFirestore, getDoc } from 'firebase/firestore'
import UseUser from '../../hooks/use-user'
const firestore = getFirestore(firebase)

const Tags = ({
    profile: {
        tags = [],
        username: profileUsername
    }
}) => {

    const { user } = UseUser()
    const tagsNotMine = user.username && user.username  !== profileUsername
    /* JAVASCRIPT */

    return (
        <>
            <div className='flex flex-row gap-5' >
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tags[0] : tags[0] } </p>
                </div>
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tags[1] : tags[1]} </p>
                </div>
                <div className={`${styles.tag} `} >
                    <p className={styles.tagstext} >{tagsNotMine ? tags[2] : tags[2]} </p>
                </div>
            </div>
        </>
    )
}

export default Tags
