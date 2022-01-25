import useUser from '../../hooks/use-user'
import User from './user'
import SuggestionsProfiles from './suggestions'
import '../../styles/css/suggestions-user.css'
// import UserContext from '../../context/user'

const Suggestions = () => {

    const { user, user: { docId, fullName, username, userId, following, photoURL } } = useUser()

        // const user = useContext(UserContext)
    // console.log('docId', docId)

    // console.log('fullName, username, userId', fullName, username, userId)
    return (
        <div className="sidebar border-l-2 border-black-border">
            {/* <User username={username} fullName={fullName} user={user}/> */}
            <SuggestionsProfiles userId={userId} following={following} LoggedInUserDocId={docId} user={user} photoURL={photoURL}/>
        </div>
    )
}

export default Suggestions

// Sidebar.whyDidYouRender = true

