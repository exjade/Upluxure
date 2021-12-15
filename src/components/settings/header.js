import { useContext, useState, useEffect } from 'react';
import useUser from '../../hooks/use-user'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import styles from '../../styles/modules/my-account/header.module.css'
// import * as ROUTES from '../../constants/routes'
/* Material UI*/
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Avatar from '@material-ui/core/Avatar';
/* Firebase, Firestore & Storage */
import { firebase } from '../../lib/firebase'
import { getFirestore, doc, onSnapshot, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const URL = 'https://ip.nf/me.json';

const Header = () => {
    const {
        user,
        user: {
            fullName,
            photoURL,
            token
        } } = useUser()
    console.log(user)

    /* Get User Location*/
    const [userLocation, setUserLocation] = useState({ ip: "" })
    useEffect(() => {
        fetch(URL, { method: "get" })
            .then(res => res.json())
            .then(data => {
                setUserLocation({ ...data })
            })

        setTimeout(() => {
            setIsLoading(false)
        }, 1100);
    }, [])

    /* Content Loader*/
    const [isLoading, setIsLoading] = useState(true);
    const loader = () => {
        return (
            <ContentLoader
                viewBox="0 0 850 450"
                backgroundColor="#181818"
                foregroundColor="#212121b8"
                styles={styles.loader}
            >
                <rect x="1" y="66"  width="1000" height="500" />
            </ContentLoader>
        )
    }
    if (isLoading) {
        return loader()
    } else {
        return (
            <>
                <div className={`${styles.main} grid mx-auto max-w-screen-lg`} >
                    <div className={`${styles.mainback}`} >
                        {/* to={`/p/${user.displayName}`} */}
                        <Link  >
                            <KeyboardBackspaceIcon className={`${styles.back}`} />
                        </Link>
                        <p className='text-white-normal font-medium text-xl '>My Profile</p>
                        <MoreHorizIcon className={`${styles.back}`} />
                    </div>
                    <div className={`${styles.container} container flex justify-center mt-10 items-center`} >
                        <>
                            <div className={`${styles.avatarcontainer} flex justify-center`} >
                                <Avatar className={`${styles.avatar}`} src={photoURL} height="112" width="112" />
                            </div>
                        </>
                        <div className="flex items-center justify-center flex-col col-span-2">
                            <div className="container flex flex-col mt-3">
                                <p className={`text-3xl text-white-primary font-bold `} >{fullName}</p>

                                <div className={`${styles.info} container flex mt-2 `} >

                                    {
                                        isLoading ? (
                                            <></>
                                        ) : (
                                            <>
                                                <LocationOnIcon className={`${styles.location} text-gray-primary`} />
                                                <p className="font-normal text-gray-primary text-2x1">{`${userLocation.ip.city} - ${userLocation.ip.country}`}</p>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center flex-col col-span-2 mt-5">
                            <div className="container flex flex-col mb-10">
                                <div className={`${styles.coin} `}>
                                    <span className='text-white-primary font-medium flex flex-row'>Saldo:
                                        {
                                            token > 0 ? (
                                                <p className='ml-2 font-bold '>{token} Lux's</p>
                                            ) : (
                                                <p className='ml-2 font-bold '>{token} Lux</p>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


export default Header
