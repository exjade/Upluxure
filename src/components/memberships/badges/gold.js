import styles from '../../../styles/modules/memberships/badges/gold.module.css'


const GoldBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    GOLD
                </div>
            </div>
        </div>
    )
}
export default GoldBadge
