import { useState, useEffect } from 'react';
import useUser from '../../hooks/use-user'
import { useHistory } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import styles from '../../styles/modules/my-account/header.module.css'
// import * as ROUTES from '../../constants/routes'
/* Material UI*/
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Avatar from '@material-ui/core/Avatar';

const URL = 'https://ip.nf/me.json';

const Profile = () => {
    const {
        user: {
            fullName,
            photoURL,
            token,
            Country,
            rol
        } } = useUser()
    let history = useHistory()

    useEffect(() => {
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
                <rect x="1" y="66" width="1000" height="500" />
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
                        <KeyboardBackspaceIcon className={`${styles.back}`} onClick={history.goBack} />
                        <p className='text-white-normal font-medium text-xl '>My Profile</p>
                        <MoreHorizIcon className={`${styles.back}`} />
                    </div>
                    <div className={`${styles.container} container flex justify-center mt-10 items-center`} >
                        <>
                            <div className={`${styles.avatarcontainer} flex justify-center`} >
                                <Avatar
                                    className={`${styles.avatar} animate-pulse 
                                    ${
                                        rol === 'gold' ? 'border-2 border-badges-gold' 
                                        : rol === 'diamond' ? 'border-2 border-badges-diamond' 
                                        : rol === 'platinum' ? 'border-2 border-badges-platinum' 
                                    
                                    : null}`}
                                    src={photoURL}
                                    height="112"
                                    width="112" />
                            </div>
                        </>
                        <div className="flex items-center justify-center flex-col col-span-2">
                            <div className="container flex flex-col mt-3">
                                <p className={`text-3xl text-white-primary font-bold`} >{fullName}</p>

                                <div className={`${styles.info} container flex t-2 `} >

                                    {
                                        isLoading ? (
                                            <></>
                                        ) : (
                                            <>
                                                <LocationOnIcon className={`${styles.location} text-gray-primary`} />
                                                <p className={`font-normal text-gray-primary text-2x1 mb-2 `}>{Country}</p>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center flex-col col-span-2 mt-2">
                            <div className="container flex flex-col mb-10 ">
                                <div className={`${styles.coin} 
                                ${
                                    rol === 'gold' ? 'hover:bg-badges-gold' 
                                    : rol === 'diamond' ? ' hover:bg-badges-diamond' 
                                    : rol === 'platinum' ? ' hover:bg-badges-platinum' 
                                    : null} 
                                cursor-pointer`}>
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


export default Profile
