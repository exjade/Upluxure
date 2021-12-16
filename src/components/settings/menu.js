import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import styles from '../../styles/modules/my-account/menu.module.css'

/* Material ui */
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StarsIcon from '@mui/icons-material/Stars';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';

const Menu = () => {
    return (
        <>
            <div className={`${styles.main} grid mx-auto max-w-screen-lg`} >
                <p className={`${styles.title} text-white-normal text-3xl font-bold`} >Settings</p>
                <div className={`${styles.container} container flex justify-center items-center flex-col`} >
                    <div className={styles.hola_grid}>
                        <div className={`${styles.spaceb} flex flex-row mb-1`} >
                            <div className={`${styles.circle}`} >
                                <StarsIcon />
                            </div>
                            <Link className={styles.memberships} to={ROUTES.MEMBERSHIPS}>
                                <p className={`${styles.menu} text-white-ctitle font-normal hover:text-purple-stories`} >Memberships</p>
                                <ArrowForwardIosIcon className={`${styles.arrow}`} />
                            </Link>
                        </div>
                        <Divider />
                        <Link  >
                            <div className={`${styles.spaceb} flex flex-row mt-8 mb-1`} >
                                <div className={`${styles.circle}`} >
                                    <HelpIcon />
                                </div>
                                <p className={`${styles.menu} text-white-ctitle font-normal hover:text-purple-stories`} >Contact us</p>
                                <ArrowForwardIosIcon className={`${styles.arrow}`} />
                            </div>
                        </Link>
                        <Divider />
                        <div className={`${styles.spaceb} flex flex-row mt-8 mb-1`} >
                            <div className={`${styles.circle}`} >
                                <InfoIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal hover:text-purple-stories`} >About</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`} />
                        </div>
                        <Divider />
                        <div className={`${styles.spaceb} flex flex-row mt-8 mb-1`} >
                            <div className={`${styles.circle}`} >
                                <ExitToAppIcon />
                            </div>
                            <p className={`${styles.menu} text-white-ctitle font-normal hover:text-purple-stories`} >Log Out</p>
                            <ArrowForwardIosIcon className={`${styles.arrow}`} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Menu
