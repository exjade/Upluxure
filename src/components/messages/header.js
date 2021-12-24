import User from './user'
import SearchBar from './searchbar'
import styles from '../../styles/modules/messenger/header.module.css'

const Header = ({premiumUsers}) => {

    return (
        <>
            <div className={`${styles.header}`} >
                <div  className={`${styles.searchbar} mb-8`} >
                    <SearchBar />
                </div>
                <div className={styles.wrapper} >
                    {premiumUsers.slice(0,10).map(user =>
                        <User
                            key={user.uid}
                            user={user}
                        />)}
                </div>
            </div>
        </>
    )

}
export default Header
