import React, { useState, useContext } from 'react'
import { firebase } from '../lib/firebase'
import Button from '@mui/material/Button';
import UserContext from '../context/user'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, updateDoc, doc, collection, addDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Pruebas = (event) => {

    let downloadUrl;
    

    const { user ,user: userId, docId, username } = useContext(UserContext)
    console.log(user)
    const newDoc =  async (event)  => {
        event.preventDefault()


            // const description = event.target.caption.value
            try {
                const docRef = await addDoc(collection(firestore, "photos"), {
                    caption: 'hoola',
                    comments: [],
                    dateCreated: new Date(),
                    imageSrc: downloadUrl,
                    likes: [],
                    photoId: 6,
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
    

    const fileHandler = async (event) => {

        const localFile = event.target.files[0];
        const storageRef = ref(storage, `/images/avatars/${user.displayName}/${localFile.name}`)
        await uploadBytes(storageRef, localFile)
        downloadUrl = await getDownloadURL(storageRef)

    }


    return (
       <>
            <form onSubmit={newDoc}>
                <input
                    type="file"
                    onChange={fileHandler}
                />
                <input
                    type="text"
                    name="caption"
                    placeholder="write a description"
                    className="text-black-background place-content-center   "
                />
                <Button onClick={newDoc}>Enviar</Button>
            </form>
            
            <img src={downloadUrl} /> 
            
        </>
    )
}

export default Pruebas
