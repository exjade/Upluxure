import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase'; // sign and signout functions
import * as ROUTES from '../constants/routes';
import '../styles/css/searchbardown.css'
/* Mateial */
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ButtonBase from '@mui/material/ButtonBase';

import { v4 as uuidv4 } from 'uuid';
/* Modal */
/* Material UI*/
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const SearchBarDown = () => {

    /* Modal */
    let history = useHistory();
    let downloadUrl;
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    /* error */
    const [error, setError] = useState('');

    const { firebase } = useContext(FirebaseContext);
    const {
        user, user: { uid, displayName },
    } = useContext(UserContext);
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
            // console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            setError(console.log("Processing File :)"))
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
        const storageRef = ref(storage, `/images/avatars/${user.displayName}/${uuidv4() + localFile.name} `)
        await uploadBytes(storageRef, localFile)
        downloadUrl = await getDownloadURL(storageRef)
        // console.log(downloadUrl)
        newDoc()
    }
    /* END UPLOAD FILE*/

    /* SpeedDial - ICONS */
    const actions = [
        { icon: <InsertPhotoIcon sx={{ color: 'black' }} onClick={handleOpen} />, name: 'Library' },
        { icon: <PhotoCameraIcon sx={{ color: 'black' }} />, name: 'Camera' },
        { icon: <VideocamIcon sx={{ color: 'black' }} />, name: 'Video' }
    ];

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
                                            <HomeIcon />
                                        </ButtonBase>
                                    </Link>
                                </div>
                                <div className="homesearchbar__search">
                                    <ButtonBase >
                                        <SearchIcon />
                                    </ButtonBase>
                                </div>
                                <div className="homesearchbar__add">
                                    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 2 }}>
                                        <Backdrop open={openModal} />
                                        <SpeedDial
                                            ariaLabel="SpeedDial Home"
                                            className="speed-dial"
                                            icon={<SpeedDialIcon />}
                                            onClose={handleCloseModal}
                                            onOpen={handleOpenModal}
                                            open={openModal}

                                        >
                                            {actions.map((action) => (
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={handleCloseModal}
                                                >
                                                </SpeedDialAction>
                                            ))}
                                        </SpeedDial>
                                    </Box>
                                </div>
                                <div className="homesearchbar__notifications">
                                    <ButtonBase>
                                        <NotificationsIcon
                                        />
                                    </ButtonBase>
                                </div>
                                <div className="homesearchbar__search">
                                    <Link to={`/p/${user.displayName}`}>
                                        <Avatar
                                            src={`/images/avatars/${user.displayName}.jpg`}
                                            alt={`${user.displayName} profile picture`}
                                        />
                                    </Link>
                                </div>

                            </div>

                            {/* Modal */}
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className="container flex justify-center  "
                            >
                                <Box
                                    className="flex flex-col w-96 h-64 p-5 my-60 justify-between border border-white-primary object-center rounded-lg"
                                >
                                    <form
                                    onSubmit={newDoc}
                                    >
                                        <label htmlFor="icon-button-file" className="btn-6">
                                            <Input
                                                accept="image/*"
                                                id="icon-button-file"
                                                type="file"
                                                onChange={fileHandler}
                                            />
                                            <span>
                                                Select Image
                                            </span>
                                        </label>
                                        <label htmlFor="fiel-area-text" className="textfield-6">
                                            <TextField
                                                id="fiel-area-text"
                                                label="Write a description for your post"
                                                multiline
                                                fullWidth
                                                rows={4}
                                            />
                                        </label>
                                    </form>
                                    <button
                                        variant="contained"
                                        component="span"
                                        onClick={() => {
                                            setTimeout(() => {
                                                newDoc()
                                                history.push(ROUTES.LOGIN)
                                            }, 2500);
                                        }}
                                        className="btn__upload"
                                    >
                                        Upload Image
                                    </button>
                                </Box>
                            </Modal>
                        </>
                    )
                    : null
            }
        </>
    )
}

export default SearchBarDown
