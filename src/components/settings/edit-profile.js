import { useEffect, useState, useContext } from "react"
import '../../styles/css/profile/profile-information.css'
import { useHistory } from "react-router-dom"
import * as ROUTES from '../../constants/routes'
/* Material UI*/
import UserContext from '../../context/user';
import { v4 as uuidv4 } from 'uuid';

/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, updateDoc, getDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const EditProfile = ({
    handleCloseModal,
    profile: {
        Age,
        Height,
        Weight,
        Country,
        AboutMe,
        Gender,
        Language,
        BodyType,
        fullName,
        following = [],
        followers = [],
        sxpreference,
        photoURL,
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername
    }
}) => {
    const {
        user
    } = useContext(UserContext);
    console.log(user)
    let history = useHistory();
    useEffect(() => {
        document.title = 'Edit Profile - Upluxure'
    }, [])

    /* UPLOAD PROFILE PICTURE */
    let downloadUrl;
    const [error, setError] = useState(null);
    // Upload a file to firebase storage and get the download url
    const fileHandler = async (event) => {
        try {
            const localFile = event.target.files[0];
            const storageRef = ref(storage, `/images/profile/${user.displayName}/${uuidv4() + localFile.name} `)
            await uploadBytes(storageRef, localFile)
            downloadUrl = await getDownloadURL(storageRef)
            console.log('successfully uploaded! Dev: Exjade')
        } catch (error) {
            console.log('Failed to upload: ', error)
        }
    }

    /* UPLOAD FILE*/
    const [success, setsuccess] = useState(null);
    // Add a new document in 'photos' collection  
    const newDoc = async () => {
        try {
            const docRef = doc(firestore, "users", profileDocId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            if (docRef) {
                await updateDoc(docRef, {
                    photoURL: downloadUrl,
                });
            }
            console.log("Successfully!", docRef.id);
        } catch (error) {
            console.log("Failed: Updating your file :(", error.message);
        }
        if (error) {
            setError('try again in a few minutes')
        } {
            setsuccess('Successful upload!')
        }
        setTimeout(() => {
            handleCloseModal()
        }, 1500);
        setTimeout(() => {
            window.location.reload()
        }, 500);
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
        <>
            <form
                className="container"
                onSubmit={
                    (e) => {
                        e.preventDefault()
                    }
                }
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <p className="text-red-500 text-lg font-bold">Profile Information</p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center ">
                    {
                        photoURL === '' ? (
                            <img src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fprofile%2FUPLUXURE_PROFILE_DEFAULT_USER%2Fdefault.png?alt=media&token=b45aa922-e61e-4af9-befd-cba374ef67a9" height="100" width="100" />
                        ) : (
                            <img
                                src={`${photoURL} `}
                                height="80"
                                width="80"
                                className={`rounded-full`}
                            />
                        )
                    }
                    <div className="w-full px-2 mb-2 mt-3 rounded-full">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="ProfilePicture">
                        </label>
                        <input className="appearance-none  w-full text-gray-700 border border-gray-primary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                            accept="image/*"
                            type="file"
                            onChange={fileHandler}
                        />
                    </div>
                    {
                        error ? (

                            <p className="text-red-warning font-bold text-xs mb-6">{error}</p>
                        ) :
                            success ? (
                                <p className="text-green-button font-bold text-xs mb-6">{success}</p>
                            ) : null
                    }
                    <button
                        className="border-b-2 hover:bg-green-button text-blue-700 font-semibold hover:text-white-normal py-2 px-4 border  hover:border-transparent rounded border-black-background"
                        onClick={() => {
                            newDoc()
                        }}
                    >Update profile picture</button>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Full Name
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane Lewis"
                            minLength="4" maxLength="30"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-3 ">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            About me
                        </label>
                        <textarea className="appearance-none resize-none w-full text-gray-700 border border-gray-border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""
                            minLength="4" maxLength="200"
                        />
                        <p className="text-red-500 text-xs italic">Write a short description</p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1 ">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Language
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="English, Spanish, Etc"
                            minLength="4" maxLength="10"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Body Type
                        </label>
                        <div className="relative">
                            <select className=" appearance-none w-full border-gray-border border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>No Answer</option>
                                <option>Average</option>
                                <option>Slim/Petite</option>
                                <option>Athletic</option>
                                <option>Muscular</option>
                                <option>Ample</option>
                                <option>Athletic</option>
                                <option>Little in the middle</option>
                                <option>Large</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Country
                        </label>
                        <div className="relative">
                            <select className=" appearance-none w-full border-gray-border border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-button" id="grid-state">
                                <option>No Answer</option>
                                <option>Argentina</option>
                                <option>Bolivia</option>
                                <option>Brasil</option>
                                <option>Cuba</option>
                                <option>Chile</option>
                                <option>Canada</option>
                                <option>Colombia</option>
                                <option>Costa Rica</option>
                                <option>Ecuador</option>
                                <option>El Salvador</option>
                                <option>Guyana</option>
                                <option>Paraguay</option>
                                <option>Perú</option>
                                <option>Suriname</option>
                                <option>Uruguay</option>
                                <option>United Stated</option>
                                <option>Venezuela</option>
                                <option>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Gender
                        </label>
                        <div className="relative">
                            <select className=" appearance-none w-full focus:border border border-gray-border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-button" id="grid-state">
                                <option>No Answer</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>TS/TV/TG</option>
                                <option>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Sexual Preference
                        </label>
                        <div className="relative">
                            <select className=" appearance-none w-full border-gray-border border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-button" id="grid-state">
                                <option>No Answer</option>
                                <option>Gay</option>
                                <option>Straight</option>
                                <option>Bisexual</option>
                                <option>Bi-curious</option>
                                <option>Transgender</option>
                                <option>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #1
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Travel" />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #2
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Shopping" />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #3
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Food" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Age
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="26" min="18" />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Height
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="CM" min="0" />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Weight
                        </label>
                        <input className="appearance-none  w-full border-gray-border text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="KG" min="0" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3 mb-3 mt-3 flex flex-row items-center justify-around">
                        <button className="border-b-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white-normal py-2 px-4 border hover:bg-black-btnicon rounded border-black-background"
                            onClick={(e) => {
                                e.preventDefault()
                                handleCloseModal()
                            }}
                        >
                            Cancel
                        </button>
                        <button className="border-b-4 hover:bg-green-button text-blue-700 font-semibold hover:text-white-normal py-2 px-4 border  hover:border-transparent rounded border-black-background"
                            onClick={(e) => {
                                e.preventDefault()
                            }}
                        >
                            Done
                        </button>
                    </div>
                    <div className="flex justify-center items-center align-center">
                        <p className="text-red-warning font-bold text-xs mb-6">Your personal information will be updated</p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditProfile
