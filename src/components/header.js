import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/css/header.css'
import FirebaseContext from '../context/firebase'; // sign and signout functions
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import BasicMenu from './menu/basic-menu'
import useUser from '../hooks/use-user';

/* Material UI*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IosShareIcon from '@mui/icons-material/IosShare';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    /* IsMobile? */
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 701);
    }
    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])
    // console.log('user', user)

    let downloadUrl;
    const [caption, setCaption] = useState({ caption: '' });
    const [open, setOpen] = useState(false);
    let [img, setImg] = useState('');

    /* Functions - Upload files */
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


    /* Update online/offline*/
    const { user: { docId } } = useUser();

    async function updateUserStatus() {
        const statusRef = doc(firestore, "users", docId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(statusRef, {
            isOnline: true
        });
    }

    /* Modal Menu Basic*/
    let history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    /* Modal Upload Files */
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (event) => event.preventDefault();


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
                                                            <Link to={ROUTES.INBOX} aria-label="inbox">
                                                                <IconButton
                                                                    className="header_inbox_icon"
                                                                    onClick={() => updateUserStatus()}
                                                                >
                                                                    <SendOutlinedIcon className=" text-white-primary"
                                                                    />
                                                                </IconButton>
                                                            </Link>
                                                            <Link to="#" aria-label="add">
                                                                <IconButton className="header_add_icon"
                                                                    onClick={handleOpen}>
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
                                                                className="flex flex-col w-96 h-64 p-5 my-auto justify-between object-center rounded-lg
                                                                "
                                                            >
                                                                <div className="searchbardown__back_modal
                                                                mx-auto max-w-screen-lg h-screen
                                                                " >
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
                                                                    className='form__searchbardown_modal_container
                                                                    mx-auto max-w-screen-lg h-screen'
                                                                >


                                                                    {img ? (
                                                                        <div className="form_header_image">
                                                                            <img src={img} alt="preview" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="form_header_image">
                                                                            <img
                                                                                src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Flogo.png?alt=media&token=c22c4472-b70a-46a1-ac6b-3d7eecd1bc04"
                                                                                alt="no-image-searchbardown" />
                                                                        </div>
                                                                    )
                                                                    }

                                                                    <div className="form__searchbardown_container
                                                                    mx-auto max-w-screen-lg h-screen
                                                                    ">
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
                                                                            variant="contained"
                                                                            component="span"
                                                                            onClick={() => {
                                                                                setTimeout(() => {
                                                                                    newDoc()
                                                                                }, 3500);
                                                                            }}
                                                                            className="btn__upload"
                                                                        >
                                                                            <IosShareIcon />
                                                                        </button>
                                                                    </div>
                                                                </form>
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
