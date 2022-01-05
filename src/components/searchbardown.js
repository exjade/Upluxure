import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
/* Routes */
import * as ROUTES from '../constants/routes';
/* Styles */
import '../styles/css/searchbardown.css'
/*Context*/
import UserContext from '../context/user';
// import FirebaseContext from '../context/firebase'; // sign and signout functions
/* Hooks */
import useUser from '../hooks/use-user';
import { v4 as uuidv4 } from 'uuid';
/* Material UI*/
import Box from '@mui/material/Box';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import IosShareIcon from '@mui/icons-material/IosShare';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc
} from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const SearchBarDown = () => {
    const [isLoading, setIsLoading] = useState(true);
    /* Description */
    const [caption, setCaption] = useState({ caption: '' });
    let [img, setImg] = useState('');
    const isInvalid = img === '' || caption.caption === '';
    /* Modal */
    const handleSubmit = async (event) => event.preventDefault();
    const { user: { photoURL } } = useUser();
    const { user } = useContext(UserContext)
    const [open, setOpen] = useState(false);
    /* Speel Dial*/
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /* Mobile */
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 840);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])


    let downloadUrl;
    // Upload a file to firebase storage and get the download url
    const fileHandler = async (event) => {
        try {
            const localFile = event.target.files[0];
            const storageRef = ref(storage, `/images/avatars/${user.displayName}/${uuidv4() + localFile.name} `)
            await uploadBytes(storageRef, localFile)
            downloadUrl = await getDownloadURL(storageRef)
            console.log('successfully uploaded! Dev: Exjade')
            setImg(downloadUrl)
        } catch (error) {
            console.log(error)
        }
    }

    /* UPLOAD FILE*/
    // Add a new document in 'photos' collection  
    const newDoc = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "photos"), {
                caption: '',
                comments: [],
                dateCreated: Date.now(),
                imageSrc: img,
                likes: [],
                userId: user.uid,
                username: user.displayName,
            });
            await updateDoc(docRef, {
                caption: caption.caption,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.log("Failed: processing your file :(", error.message);
        }
        setTimeout(() => {
            handleClose();
            setImg('')
            setCaption({ caption: '' })
        }, 100);
    }



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, []);

    /* END UPLOAD FILE*/
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

    if (isLoading) {
        return <></>
    } else {
        return (
            <>
                {
                    user && !isDesktop ?
                        (
                            <>
                                <div className="homesearch__card">
                                    <div className="homesearchbar__dashboard">
                                        <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                            <ButtonBase>
                                                <HomeIcon
                                                    sx={{ color: 'white' }}
                                                />
                                            </ButtonBase>
                                        </Link>
                                    </div>
                                    <div className="homesearchbar__search cursor-pointer ">
                                        <ButtonBase >
                                            <NotificationsIcon
                                                sx={{ color: 'white' }}
                                            />
                                        </ButtonBase>
                                    </div>
                                    <div
                                        className="homesearchbar__add"
                                        onClick={handleOpen}
                                    >
                                        <AddIcon
                                            className="ota-x" />
                                        <div className="bolinhas">
                                            <IconButton className="ota-bolinha"
                                                onClick={handleOpen}
                                            >
                                                <InsertPhotoIcon
                                                    sx={{ color: 'white' }}
                                                />

                                            </IconButton>
                                        </div>
                                    </div>
                                    <Link to={ROUTES.INBOX}>
                                        <div className="homesearchbar__notifications">
                                            <ButtonBase>
                                                <SendIcon
                                                    sx={{ color: 'white' }}
                                                />
                                            </ButtonBase>
                                        </div>
                                    </Link>
                                    <div className="homesearchbar__search">
                                        <Link to={`/p/${user.displayName}`}>
                                            <Avatar src={photoURL} />
                                        </Link>
                                    </div>

                                </div>

                                {/* Modal */}
                                <Modal
                                    open={open}
                                    onClose={
                                        () => {
                                            handleClose()
                                            setImg('')
                                        }
                                    }
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box
                                        className="flex flex-col w-96 h-64 p-5 my-auto justify-between object-center rounded-lg"
                                    >
                                        <div className="searchbardown__back_modal" >
                                            <button
                                                onClick={
                                                    () => {
                                                        handleClose()
                                                        if (img) {
                                                            setImg('')
                                                        }
                                                    }
                                                }
                                                className="cancel_searchbardown_modal text-white-normal"
                                            >
                                                <KeyboardBackspaceIcon

                                                />
                                            </button>
                                        </div>

                                        <form
                                            onSubmit={handleSubmit}
                                            className='form__searchbardown_modal_container'
                                        >


                                            {img ? (
                                                <div className="form_searchbardown_image">
                                                    <img src={img} alt="preview" />
                                                </div>
                                            ) : (
                                                <div className="form_searchbardown_image">
                                                    <span className="text-white-normal text-3xl justify-center font-thin font-mono" >
                                                        <p>Select your file</p>
                                                        <p>Write a description</p>
                                                        <p>and Upload</p>
                                                    </span>
                                                    {/* <img
                                                        src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Flogo.png?alt=media&token=c22c4472-b70a-46a1-ac6b-3d7eecd1bc04"
                                                        alt="no-image-searchbardown" /> */}
                                                </div>
                                            )
                                            }

                                            <div className="form__searchbardown_container">
                                                <label htmlFor="icon-button-file" className="btn-6">
                                                    <input
                                                        type="file"
                                                        id="img"
                                                        accept="image/*"
                                                        onChange={fileHandler}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <label htmlFor='img'>
                                                        <InsertPhotoIcon />
                                                    </label>
                                                </label>
                                                <input
                                                    className="searchbardown_modal_input"
                                                    type="text"
                                                    placeholder='Write a description'
                                                    value={caption.caption}
                                                    onChange={(event) => setCaption({ caption: event.target.value })}
                                                />


                                                <button
                                                    disabled={isInvalid}
                                                    variant="contained"
                                                    component="span"
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            newDoc()
                                                        }, 3500);
                                                    }}
                                                    className={`btn__upload ${isInvalid && 'opacity-30'}`}
                                                >

                                                    <IosShareIcon />
                                                </button>
                                            </div>
                                        </form>
                                    </Box>
                                </Modal>
                            </>
                        )
                        : null
                }
            </>
        )
    }
}

export default SearchBarDown
