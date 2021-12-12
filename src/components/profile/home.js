import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import styles from '../../styles/modules/profile/HomeIconComponent.module.css'
import ButtonBase from '@material-ui/core/ButtonBase';
import HomeIcon from '@material-ui/icons/Home';


const HomeIconComponent = () => {

const style = { 
    borderRadius: '999px',
}

    return (
            <div className={`${styles.HomeButton__Icon} `} >
                <Link to={ROUTES.DASHBOARD} >
                    <ButtonBase className={`${styles.buttonbase}`} >
                        <HomeIcon className={styles.homeicon} ></HomeIcon>
                    </ButtonBase>
                </Link>
            </div>
    )
}

export default HomeIconComponent
