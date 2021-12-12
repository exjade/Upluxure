import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import styles from '../../styles/modules/profile/HomeIconComponent.module.css'
import ButtonBase from '@material-ui/core/ButtonBase';
import HomeIcon from '@material-ui/icons/Home';
import ContentLoader from 'react-content-loader'


const HomeIconComponent = () => {
    const style = {
        borderRadius: '999px',
    }
    /* LOADER Skeleton*/
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);

    }, [])
    const loader = () => {
        return (
            <ContentLoader
                rtl
                speed={6}
                width={1000}
                height={200}
                viewBox="0 0 300 100"
                backgroundColor="#1c1c1c"
                foregroundColor="#2e2e2e"
                className={styles.loader}
            >
                <circle cx="131" cy="78" r="18" height="150" width="1500" />
            </ContentLoader>
        )
    }
    if (isLoading) {
        return loader()
    } else {
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
}

export default HomeIconComponent
