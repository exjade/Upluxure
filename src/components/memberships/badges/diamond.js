import styles from '../../../styles/modules/memberships/badges/diamond.module.css'


const DiamondBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    DIAMOND
                </div>
            </div>
        </div>
    )
}

export default DiamondBadge
