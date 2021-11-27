import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase'; // sign and signout functions

import '../styles/css/searchbardown.css'

/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, updateDoc, doc, collection, addDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const UseUpload = () => {

    const { firebase } = useContext(FirebaseContext);

    const {
        user
    } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 840);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])


    let downloadUrl;


    /* Modal */

    let history = useHistory();

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    /* UPLOAD FILE*/
    // Add a new document in 'photos' collection  
    const newDoc = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "photos"), {
                comments: [],
                dateCreated: new Date(),
                imageSrc: downloadUrl,
                likes: [],
                userId: user.uid,
                username: user.displayName,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    // const newDoc =  async (event)  => {
    //     event.preventDefault()


    //     try {
    //         const description = event.target.caption.value
    //         const docRef = await addDoc(collection(firestore, "pruebas"), {
    //           caption: description,
    //           imageSrc: downloadUrl,
    //         });

    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }

    // Upload a file to firebase storage and get the download url
    const fileHandler = async (event) => {
        const localFile = event.target.files[0];
        const storageRef = ref(storage, `/images/avatars/${user.displayName}/${localFile.name}`)
        await uploadBytes(storageRef, localFile)
        downloadUrl = await getDownloadURL(storageRef)
    }
    /* END UPLOAD FILE*/

    return (
        <div>
            
        </div>
    )
}

export  { UseUpload, fileHandler, newDoc,  isDesktop, setDesktop}
