import styles from '../../../styles/modules/memberships/badges/platinum.module.css'


const PlatinumBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    PLATINUM
                </div>
            </div>
        </div>
    )
}

export default PlatinumBadge
