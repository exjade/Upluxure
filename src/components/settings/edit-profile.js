import { useEffect } from "react"
/* Material UI*/

const EditProfile = () => {
    
    useEffect(() => {
        document.title = 'Edit Profile - Upluxure'
    }, [])
    return (
        <>
            <div className='grid justify-center mx-auto max-w-screen-lg'>
                <div className="container flex justify-center mt-5 items-center">
                    <p className="text-white-primary">EDIT PROFILE</p>
                </div>
            </div>
        </>
    )
}

export default EditProfile
