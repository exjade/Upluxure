import { useEffect, useContext, useState } from 'react'
import User from './user'
import UserContext from '../../context/user'
import styles from '../../styles/modules/messenger/user.module.css'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Messages = () => {
    const { user: { uid } } = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const usersRef = collection(firestore, 'users')
        // create a query object
        const q = query(usersRef, where('userId', 'not-in', [uid]))
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
    }, [])
    // console.log(users.length)


    return (
        <div className={styles.wrapper} >

            {users.map(user =>
                <User
                    key={user.uid}
                    user={user}
                />)}
        </div>
    )

}
export default Messages
