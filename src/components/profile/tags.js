import { useState } from 'react'
import styles from '../../styles/modules/profile/Tags.module.css'
/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getFirestore, getDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Tags = () => {

    const [tagsExist, setTagsExist] = useState(false)
    const [tags, setTags] = useState([{
        name: '',
    }])

    const  updateDoc  = async (e) => { 
        try {
            const docRef = getDoc(firestore, "users" , "userId" , "tags");
            await updateDoc(docRef, {
                tags: tags
            });
        } catch (error) {
            console.log("Failed", error.message);
        }

    }

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
