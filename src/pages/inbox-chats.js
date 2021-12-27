import React, { useEffect, useContext, useState } from 'react'
import useUser from '../hooks/use-user'
/* Components */
import PrivateChat from '../components/messages/private-chat/'
/*Context*/
import UserContext from '../context/user'
/* Firebase */
import { firebase } from '../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const InboxChats = () => {
    const [chat, setChat] = useState('')
    const { user: { uid } } = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('userId', 'not-in', [uid]))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            const premiumUsers = users.filter(user => user.rol !== 'free')
            setUsers(premiumUsers)
        })
        return () => unsub()
    }, [])



    const selectUser = (user) => {
        // setChat(user)
        // console.log(user)
    }
    // console.log(users)


    return (
        <>
            <PrivateChat user={users}  />
        </>
    )
}

export default InboxChats

