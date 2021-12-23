import { useState, useEffect } from 'react'
import '../../styles/modules/profile/photos.css'


const Private = () => {

  

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])
    if (isLoading) {
        return <></>
    } else {
        return (
            <div className={`h-16 border-t border-gray-primary mt-12 pt-4`} >
                <div className={`flex justify-center items-center text-white-normal`}>
                    <h2 className={`text-md`} >This is a private account</h2>
                </div>
            </div >
        )
    }
}

export default Private

