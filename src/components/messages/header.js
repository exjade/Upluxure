import { useEffect, useContext, useState } from 'react'
import User from './user'
import SearchBar from './searchbar'
import UserContext from '../../context/user'
import styles from '../../styles/modules/messenger/header.module.css'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Header = () => {
    const { user, user: { uid } } = useContext(UserContext)
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
    // console.log(users)
    const premiumUsers = users.filter(user => user.rol !==  'free')
    console.log(premiumUsers)

    return (
        <>
            <div className={`${styles.header}`} key={user.rol - user.rol}>
                <div key={user.username} className={`${styles.searchbar} mb-8`} >
                    <SearchBar />
                </div>
                <div className={styles.wrapper} >
                    {premiumUsers.slice(0,10).map(user =>
                        <User
                            key={users.uid}
                            user={user}
                        />)}
                </div>
            </div>
        </>
    )

}
export default Header
