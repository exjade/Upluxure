import React,{ useEffect, useContext, useState } from 'react'
/* Components*/
import ActiveUsers from './active-users'
import Header from './header'
// import ChatList from './user-list/chat-list'
// import SearchBarDown from './searchbar/searchbardown'
/*Context*/
import UserContext from '../../context/user'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)


const Messages = () => {
    const {  user: { uid } } = useContext(UserContext)
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
    const premiumUsers = users.filter(user => user.rol !== 'free')

    /* Select User in Chat List */
    const selectUser = (user) => {
        setChat(user)
        // console.log(user)
    }
    // console.log('chat', chat)

    return (
        <>
            <Header />
            <ActiveUsers premiumUsers={premiumUsers} selectUser={selectUser} chat={chat} />
            {/* <ChatList premiumUsers={premiumUsers} selectUser={selectUser} chat={chat}/> */}
            {/* <SearchBarDown userSearch={premiumUsers} /> */}
        </>

        
    )

}
export default Messages
