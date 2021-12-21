import styles from '../../../styles/modules/memberships/badges/admin.module.css'


const AdminBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    ADMIN
                </div>
            </div>
        </div>
    )
}

export default AdminBadge
