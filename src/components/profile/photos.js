import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import styles from '../../styles/modules/profile/Photos.module.css'
import ContentLoader from 'react-content-loader'

const Photos = ({ photos }) => {


    /* LOADER Skeleton*/
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        if (!photos) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
    }, [])
    const loader = () => {
        return (
            <ContentLoader
                width={1110}
                height={575}
                viewBox="0 0 800 575"
                backgroundColor="#181818"
                foregroundColor="#212121"
            >
                <rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
                <rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
                <rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
                <rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
                <rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
                <rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
            </ContentLoader>
        )
    }
    if (isLoading) {
        return loader()
    } else {

        return (
            <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
                <div className={`${styles.post} grid grid-cols-2 justify-around`}>
                    <h2 className={styles.title} >Photos</h2>
                    <p className={styles.amount} >{photos.length}</p>
                </div>
                <div className='grid grid-cols-2 gap-8 justify-between mt- p-3'>
                    {
                        photos.slice(1, 2).map((photo, index) => (
                            <div key={index} className=''>
                                <img
                                    src={photo.imageSrc}
                                    alt={photo.caption}
                                    className={`${styles.mainimage}  object-cover p-2`}
                                />
                            </div>
                        ))
                    }
                    {
                        photos.slice(0, 1).map((photo, i) => (
                            <div key={i} className={`${styles.imagesecondarycontainer}`} >
                                <img
                                    src={photo.imageSrc}
                                    alt={photo.caption}
                                    className={`${styles.secondoneimage} object-cover p-2`}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className={` grid grid-cols-3 gap-5 mt-10 mb-2`} >
                    {photos < 1 ? (
                        <>
                            {

                                <Skeleton count={12} height={400} width={320} />

                            }
                        </>
                    ) : photos.length > 0 ?
                        (
                            photos.slice(2, 100).map((photo) => (
                                <>
                                    <div key={photo.docId} className='relative group'>
                                        <img
                                            src={photo.imageSrc}
                                            alt={photo.caption}
                                            className={`${styles.image} w-full h-full object-cover p-3`}
                                        />

                                        {/* <div className="absolute p-3 bottom-0 left-0 z-10 w-full justify-evenly items-center h-full bg-white-faded group-hover:flex">
                                        <p className='flex items-center text-white-ctitle font-bold'>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-8 mr-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {photo.likes.length}
                                        </p>

                                        <p className="flex items-center text-white-ctitle font-bold">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-8 mr-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {photo.comments.length}
                                        </p>

                                    </div> */}
                                    </div>
                                </>
                            ))
                        )
                        : null}
                </div>
            </div>
        )
    }
}

export default Photos

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}