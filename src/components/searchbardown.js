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
import PersonIcon from '@mui/icons-material/Person';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
/* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const SearchBarDown = () => {

    /* Modal */
    let history = useHistory();
    const { user: { photoURL } } = useUser();

    const {
        user
    } = useContext(UserContext)
    const [open, setOpen] = useState(false);

    /* Speel Dial*/
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openButton, setOpenButton] = useState(false);
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
        const localFile = event.target.files[0];
        const storageRef = ref(storage, `/images/avatars/${user.displayName}/${uuidv4() + localFile.name} `)
        await uploadBytes(storageRef, localFile)
        downloadUrl = await getDownloadURL(storageRef)
        console.log('successfully uploaded! Dev: Exjade')
    }

    /* UPLOAD FILE*/
    // Add a new document in 'photos' collection  
    const newDoc = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "photos"), {
                caption: '',
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
            console.log("Failed: processing your file :(", error.message);
        }
    }
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


    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, []);

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
                                    <div className="homesearchbar__add"  >
                                        <AddIcon className="ota-x" />
                                        <div className="bolinhas">
                                            <IconButton className="ota-bolinha" onClick={handleOpen}>
                                                <InsertPhotoIcon sx={{ color: 'white' }} />
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
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box
                                        className="flex flex-col w-96 h-64 p-5 my-auto justify-between object-center rounded-lg"
                                    >
                                        <form
                                            onSubmit={handleSubmit}
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
                                                    maxLength="40"
                                                    required
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
                                                }, 3500);
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
}

export default SearchBarDown
