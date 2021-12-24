import { useEffect, useContext, useState } from 'react'
import Header from './header'
import Message from './message'
import SearchBarDown from '../searchbardown'
import UserContext from '../../context/user'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Messages = () => {
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
            <Header premiumUsers={premiumUsers}/>
            <Message />
            <SearchBarDown userSearch={premiumUsers}/>
        </>
    )

}
export default Messages
