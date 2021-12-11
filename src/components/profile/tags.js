import { Phone } from '@material-ui/icons'
import { useState } from 'react'
import styles from '../../styles/modules/profile/Tags.module.css'

const Tags = () => {

    const [tagsExist, setTagsExist] = useState(false)
    const [tags, setTags] = useState([{
        name: '',
    }])

    /* JAVASCRIPT */

    return (
        <>
            {
                tags.map((i) => (
                    <div className={styles.tag} key={i} >
                        <p className={styles.tagstext} >
                            Travel
                        </p>
                    </div>
                ))
            }
        </>
    )



}

export default Tags
