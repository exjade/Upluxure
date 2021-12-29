import React, { useEffect, useContext, useState } from 'react'
/* Components*/
import ActiveUsers from './active-users'
import Header from './header'
// import ChatList from './user-list/chat-list'
// import SearchBarDown from './searchbar/searchbardown'
/*Context*/
import UserContext from '../../context/user'
/* Firebase */
import { firebase } from '../../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { 
    getFirestore, 
    collection, 
    query, 
    where, 
    onSnapshot, 
    addDoc, 
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)


const Messages = () => {
    const { user: { uid } } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState('')
    const [text, setText] = useState('')
    const [img, setImg] = useState('')
    const [msgs, setMsgs] = useState([])

    const CurrentLoggedInUser = uid;

    useEffect(() => {
        const usersRef = collection(firestore, 'users')
        // create a query object
        const q = query(usersRef, where('userId', 'not-in', [CurrentLoggedInUser]))
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
    const selectUser = async (user) => {
        setChat(user)
        const CurrentLoggedInUser2 = user.userId;

        const id = CurrentLoggedInUser > CurrentLoggedInUser2 ?
            `${CurrentLoggedInUser}${CurrentLoggedInUser2}`
            :
            `${CurrentLoggedInUser2}${CurrentLoggedInUser}`

        const messagesRef = collection(firestore, 'messages', id, 'chat')
        const q = query(messagesRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, querySnaopshot => {
            let msgs = []
            querySnaopshot.forEach(doc => {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })

        // User who received the message will see 'unread' and when he click the sender name,
        // the 'unread' will be removed = false
        const docSnap = await getDoc(doc(firestore, 'lastMessages', id))
        if(docSnap.data()?.from !== CurrentLoggedInUser) {
           await updateDoc(doc(firestore, 'lastMessages', id), { unread: false })
        }
    }
    // console.log(msgs)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const CurrentLoggedInUser2 = chat.userId;

        const id = CurrentLoggedInUser > CurrentLoggedInUser2 ?
            `${CurrentLoggedInUser}${CurrentLoggedInUser2}`
            :
            `${CurrentLoggedInUser2}${CurrentLoggedInUser}`

        let url;
        // Im checking if the user selected an image or not
        if (img) {
            // If the user selected an image, I upload it to firebase storage
            const imgRef = ref(
                storage,
                `messages/images/${chat.username}/${new Date().getTime()} - ${img.name}`
            )
            const snap = await uploadBytes(imgRef, img)
            // I get the download url of the image
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = downloadUrl
        } 

        await addDoc(collection(firestore, 'messages', id, 'chat'), {
            text,
            from: CurrentLoggedInUser,
            to: CurrentLoggedInUser2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || '',
        })

        // Will look for docId, if it exists it will replace the existing doc
        // otherwise it will create a new doc
        await setDoc(doc(firestore, 'lastMessages', id), {
            text,
            from: CurrentLoggedInUser,
            to: CurrentLoggedInUser2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || '',
            unread: true,
        })


        setText('')

    }
// console.log(chat)
    return (
        <>
            <Header />
            <ActiveUsers
                premiumUsers={premiumUsers}
                selectUser={selectUser}
                chat={chat}
                setChat={setChat}
                text={text}
                setText={setText}
                handleSubmit={handleSubmit}
                setImg={setImg}
                msgs={msgs}
                CurrentLoggedInUser={CurrentLoggedInUser}
            />
            {/* <ChatList premiumUsers={premiumUsers} selectUser={selectUser} chat={chat}/> */}
            {/* <SearchBarDown userSearch={premiumUsers} /> */}
        </>


    )

}
export default Messages
