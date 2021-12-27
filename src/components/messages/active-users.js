import User from './user'
import PrivateChat from './private-chat/'
// import SearchBar from './searchbar'
import styles from '../../styles/modules/messenger/active-users.module.css'

const ActiveUsers = ({ premiumUsers, selectUser, chat }) => {

    return (
        <>
            <div className='flex flex-row'>

                <div className={`${styles.header}`} >
                    {/* <div  className={`${styles.searchbar} mb-8`} >
                    <SearchBar />
                </div> */}
                    <div className={styles.wrapper} >
                        {premiumUsers.slice(0, 10).map(user =>
                            <User
                                key={user.uid}
                                user={user}
                                selectUser={selectUser}
                            />)}
                    </div>
                </div>
                <div className={`${styles.privatechat} text-white-normal mt-12`}>
                    {chat ? (
                        <>
                            <PrivateChat />
                        </>
                    )
                        :
                        (
                            <>
                                <h3>Select a user to star a conversation</h3>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )

}
export default ActiveUsers
