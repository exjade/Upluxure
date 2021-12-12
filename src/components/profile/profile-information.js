import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/modules/profile/profile-information.module.css'
import ContentLoader from 'react-content-loader'

const ProfileInformation = () => {

    /* LOADER Skeleton*/
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])
    const loader = () => {
        return (
            <ContentLoader
                width={1110}
                height={575}
                viewBox="0 0 800 575"
                backgroundColor="#181818"
                foregroundColor="#212121"
            >
                <rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
                <rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
                <rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
                <rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
                <rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
                <rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
            </ContentLoader>
        )
    }
    if (isLoading) {
        return loader()
    } else {

        return (
            <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
                <div className={`${styles.post} grid grid-cols-2 justify-around`}>
                    hola1
                </div>
                <div className='grid grid-cols-2 gap-8 justify-between p-3'>
                    hola2
                </div>
                <div className={` grid grid-cols-3 gap-1 mt-2 mb-2`} >
                    Hola3
                </div>
            </div>
        )
    }
}

export default ProfileInformation

ProfileInformation.propTypes = {
    ProfileInformation: PropTypes.array.isRequired
}