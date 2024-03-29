import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/header'
import UserProfile from '../components/profile'

const Profile = () => {
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username)
            if (user?.userId) {
                setUser(user)
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists()
    }, [username, history])

    
    useEffect(() => {
        document.title = 'Profile - Upluxure'
    }, [])

    return (
        user?.username ? (
            <div className="bg-black-background">
                <Header />
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile user={user}/>
                </div>
            </div>
        )
            : null
    )
}

export default Profile

Profile.propTypes = {
    // prop: PropTypes
}