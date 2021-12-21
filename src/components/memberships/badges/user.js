import styles from '../../../styles/modules/memberships/badges/user.module.css'


const UserBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    FREE
                </div>
            </div>
        </div>
    )
}

export default UserBadge
