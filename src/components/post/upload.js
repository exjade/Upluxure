import React, { useState, useContext } from 'react'
/* Context */
import UserContext from '../../context/user'
import Header from '../header'
/* Material UI*/
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc} from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Upload = () => {
    let downloadUrl;

    const { user } = useContext(UserContext)
    console.log(user)
    /* Modal */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /* UPLOAD FILE*/
    // Add a new document in 'photos' collection  
    const newDoc = async (event) => {
        event.preventDefault()
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
        return localFile
    /* END UPLOAD FILE*/
    }


    return (
        <div>
            <Header />
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="container flex justify-center  "
            >
                <Box
                    className="flex flex-col w-96 h-64 p-5 my-40 justify-between bg-white-primary object-center rounded-lg"
                >
                    <form
                        onSubmit={newDoc}
                    >
                        <label htmlFor="icon-button-file">
                            <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                onChange={fileHandler}
                            />
                        </label>
                        <TextField
                            label="Write a description"
                            multiline
                            fullWidth
                            rows={4}
                        />
                    </form>
                    <button
                        variant="contained"
                        component="span"
                        onClick={newDoc}
                        className="mt-3 bg-gray-900"
                    >
                        Upload
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default Upload
