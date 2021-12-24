import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/css/header.css'
import FirebaseContext from '../context/firebase'; // sign and signout functions
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import BasicMenu from './menu/basic-menu'

/* Material UI*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { v4 as uuidv4 } from 'uuid';
/* Modal */
/* Material UI*/
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 701);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])
    // console.log('user', user)

    const fileHandler = async (event) => {
        const localFile = event.target.files[0];
        const storageRef = ref(storage, `/images/avatars/${user.displayName}/${uuidv4() + localFile.name} `)
        await uploadBytes(storageRef, localFile)
        downloadUrl = await getDownloadURL(storageRef)
        console.log('successfully uploaded! Dev: Exjade')
    }

    /* Modal */
    let history = useHistory();
    let downloadUrl;
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const newDoc = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "photos"), {
                caption: "prueba de descripcion",
                comments: [],
                dateCreated: Date.now(),
                imageSrc: downloadUrl,
                likes: [],
                userId: user.uid,
                username: user.displayName,
            });
            await updateDoc(docRef, {
                caption: caption.caption,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.log("Failed: processing your file :(")
        }
        setTimeout(() => {
            history.push(ROUTES.LOGIN)
        }, 3500);
    }
    const [caption, setCaption] = useState({
        caption: ''
    });

    const handleCaptionChange = async (e) => {
        setCaption(
            {
                ...caption,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <header className="h-16 border-b  mb-5">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    {/* Left */}
                    <div className="text-gray-primary text-center flex items-center align-items cursor-pointer" >
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="instagram logo">
                                <img src="/images/users/logo.png" alt="Upluxure" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    {/* Right */}
                    <div className="text-center text-white-primary flex items-center align-items">
                        {
                            user ?
                                (
                                    <>
                                        {
                                            !isDesktop ? (
                                                <BasicMenu className="mobile_menu" />
                                            ) :
                                                (
                                                    <>
                                                        <div className="menudesktop">
                                                        <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                                                <IconButton className="header_home_icon">
                                                                    <HomeOutlinedIcon className="text-white-primary" />
                                                                </IconButton>
                                                            </Link>
                                                            <Link to={ROUTES.MESSENGER} aria-label="inbox">
                                                                <IconButton className="header_inbox_icon">
                                                                    <SendOutlinedIcon className=" text-white-primary"
                                                                    />
                                                                </IconButton>
                                                            </Link>
                                                            <Link to="#" aria-label="add">
                                                                <IconButton className="header_add_icon"
                                                                    onClick={handleOpenModal}>
                                                                    <AddCircleOutlineIcon className=" text-white-primary"
                                                                    />
                                                                </IconButton>
                                                            </Link>
                                                            <Link to={ROUTES.DASHBOARD} aria-label="not">
                                                                <IconButton className="header_notifications_icon">
                                                                    <NotificationsIcon className=" text-white-primary"
                                                                    />
                                                                </IconButton>
                                                            </Link>
                                                            
                                                        </div>
                                                        <BasicMenu />

                                                        {/* Modal */}
                                                        <Modal
                                                            open={openModal}
                                                            onClose={handleCloseModal}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                        >
                                                            <Box
                                                                className="flex flex-col w-96 h-64 p-5 my-auto justify-between object-center rounded-lg"
                                                            >
                                                                <form
                                                                    onSubmit={() => {
                                                                        setTimeout(() => {
                                                                            newDoc()
                                                                        }, 6500);
                                                                    }}
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
                                                                            maxLength="40"
                                                                            required
                                                                            rows={4}
                                                                            name="caption"
                                                                            value={caption.caption}
                                                                            onChange={handleCaptionChange}
                                                                        />
                                                                    </label>
                                                                </form>
                                                                <button
                                                                    variant="contained"
                                                                    component="span"
                                                                    onClick={() => {
                                                                        setTimeout(() => {
                                                                            newDoc()
                                                                        }, 6500);
                                                                    }}
                                                                    className="btn__upload"
                                                                >
                                                                    Upload Image
                                                                </button>
                                                            </Box>
                                                        </Modal>
                                                    </>
                                                )


                                        }
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Link to={ROUTES.LOGIN} aria-label="Log in button">
                                            <button
                                                type="button"
                                                className="bg-gray-button font-bold text-sm rounded w-20 h-8 text-center text-white-primary"
                                            >
                                                Log In
                                            </button>
                                        </Link>
                                        <Link to={ROUTES.SIGN_UP} aria-label="Sign Upbutton">
                                            <button
                                                type="button"
                                                className="font-bold text-sm rounded text-gray-primary w-20 h-8 "
                                            >
                                                Sign Up
                                            </button>
                                        </Link>
                                    </>
                                )
                        }
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
