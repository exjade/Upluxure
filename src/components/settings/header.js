import { useContext } from 'react';
import styles from '../../styles/modules/my-account/header.module.css'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user';

/* Material UI*/
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = () => {
    const {user} = useContext(UserContext);

    return (
        <>
            <div className={`${styles.main} grid mx-auto max-w-screen-lg`} >
                <div className={`${styles.mainback}`} >
                    <Link to={`/p/${user.displayName}`}>
                        <KeyboardBackspaceIcon className={`${styles.back}`} />
                    </Link>
                    <p className='text-white-normal font-medium text-xl '>My Profile</p>
                    <MoreHorizIcon className={`${styles.back}`} />
                </div>
                <div className={`${styles.container} container flex justify-center mt-10 items-center`} >

                    <div className={`${styles.avatarcontainer} flex justify-center`} >
                        <img className={`${styles.avatar}`} />
                    </div>

                    <div className="flex items-center justify-center flex-col col-span-2">
                        <div className="container flex flex-col mt-3">
                            <p className={`text-3xl text-white-primary font-bold `} >Jon moller</p>

                            <div className={`${styles.info} container flex mt-2 `} >
                                <LocationOnIcon className={`${styles.location} text-gray-primary`} />
                                <p className="font-normal text-gray-primary text-2x1">Oslo, Norway</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-col col-span-2 mt-5">
                        <div className="container flex flex-col mb-10">
                            <div className={`${styles.coin} `}>
                                <span className='text-white-primary font-medium flex flex-row'>Saldo: <p className='ml-2 font-light '>500 coins</p></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header
