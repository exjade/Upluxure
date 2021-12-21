import styles from '../../../styles/modules/memberships/badges/model.module.css'


const ModelBadge = () => {
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.border}`} >
                <div className={`${styles.text} text-white-normal`} >
                    MODEL
                </div>
            </div>
        </div>
    )
}

export default ModelBadge
