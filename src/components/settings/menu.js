import styles from '../../styles/modules/my-account/menu.module.css'
// import * as ROUTES from '../../constants/routes'

/* Material ui */
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';

const Menu = () => {
    return (
        <>
            <div className={`${styles.main} grid mx-auto max-w-screen-lg`} >
                    <p className={`${styles.title} text-white-normal text-3xl font-bold`} >Settings</p>
                <div className={`${styles.container} container flex justify-center items-center flex-col`} >
                    <div className={styles.hola_grid}>
                        <div className={`${styles.spaceb} flex flex-row mb-5`} >
                            <div className={`${styles.circle}`} >
                                <NotificationsIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal`} >Notifications</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`}/>
                        </div>
                        <Divider />
                        <div className={`${styles.spaceb} flex flex-row mt-8 mb-5`} >
                            <div className={`${styles.circle}`} >
                                <EditIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal`} >Edit Profile</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`}/>
                        </div>
                        <Divider />
                        <div className={`${styles.spaceb} flex flex-row mt-8 mb-5`} >
                            <div className={`${styles.circle}`} >
                                <HelpIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal`} >Help</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`}/>
                        </div>
                        <Divider />
                        <div className={`${styles.spaceb} flex flex-row mt-8 mb-5`} >
                            <div className={`${styles.circle}`} >
                                <InfoIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal`} >About</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Menu
