import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
/* Components */
import PrivateChat from '../components/messages/private-chat/'
/*Context*/
import UserContext from '../context/user'
/* Firebase */
import { firebase } from '../lib/firebase'
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const InboxChats = () => {
    const [chat, setChat] = useState('')
    const { user: { uid  } } = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('userId', 'not-in', [uid]))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
    }, [])
    const premiumUsers = users.filter(user => user.rol !== 'free')
    
    const selectUser = (user) => {
        setChat(user)
        // console.log(user)
    }
    // console.log(premiumUsers)


    return (
        <>
            <PrivateChat user={premiumUsers} chat={chat}/>
        </>
    )
}

export default InboxChats

