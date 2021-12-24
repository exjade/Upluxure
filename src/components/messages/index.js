import { useEffect, useContext, useState } from 'react'
import Header from './header'
import Message from './message'
import ChatList from './chat-list'
import SearchBarDown from '../searchbardown'
import UserContext from '../../context/user'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const Messages = () => {
    const { user, user: { uid } } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState('')

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

    const selectUser = (user) => { 
        setChat(user)
        console.log(user)
    }

    return (
        <>
            <Header premiumUsers={premiumUsers} selectUser={selectUser}/>
            <ChatList premiumUsers={premiumUsers} selectUser={selectUser}/>
            {/* <Message /> */}
            <SearchBarDown userSearch={premiumUsers}/>
        </>
    )

}
export default Messages
