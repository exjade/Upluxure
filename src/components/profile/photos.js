import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import styles from '../../styles/modules/profile/Photos.module.css'
import '../../styles/modules/profile/photos.css'
import { SRLWrapper } from "simple-react-lightbox";
import ContentLoader from 'react-content-loader'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Photos = ({ photos }) => {

    const options = {
        buttons: {
            backgroundColor: 'rgba(30,30,36,0.8)',
            iconColor: 'rgba(255, 255, 255, 0.8)',
            iconPadding: '10px',
            showAutoplayButton: false,
            showDownloadButton: false,
            showNextButton: false,
            showPrevButton: false,
            showCloseButton: true,
            showFullscreenButton: true,
            showThumbnailsButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        }
    }


    return (
        <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
            <div className={`${styles.post} grid grid-cols-2 justify-around`}>
                <h2 className={styles.title} >Photos</h2>
                {/* Cambio de sección */}

                <p className={styles.amount} >{photos.length}</p>
            </div>
            <div className='grid grid-cols-2 gap-8 justify-between p-3'>
                {
                    photos.slice(1, 2).map((photo, index) => (
                        <div key={index} className=''>
                            <SRLWrapper options={options}>
                                <img
                                    src={photo.imageSrc}
                                    alt={photo.caption}
                                    className={`${styles.mainimage}  object-cover p-2`}
                                />
                            </SRLWrapper>
                        </div>
                    ))
                }
                {
                    photos.slice(0, 1).map((photo, i) => (
                        <div key={i} className={`${styles.imagesecondarycontainer}`} >
                            <SRLWrapper options={options}>
                                <img
                                    src={photo.imageSrc}
                                    alt={photo.caption}
                                    className={`${styles.secondoneimage} object-cover p-2`}
                                />
                            </SRLWrapper>
                        </div>
                    ))
                }
            </div>
            <div className={` grid grid-cols-3 gap-1 mt-2 mb-2`} >
                {photos.length < 1 ? (
                    <>
                        {
                            <ContentLoader viewBox="0 0 820 450" height={450} width={1000}>
                                <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
                                <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
                                <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
                                <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
                                <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                                <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
                            </ContentLoader>
                        }
                    </>
                ) : photos.length > 1 ?
                    (
                        photos.slice(2, 100).map((photo) => (
                            <>
                                <div key={photo.docId} className={`relative group`}  >
                                    <SRLWrapper options={options}>
                                        <img
                                            src={photo.imageSrc}
                                            alt={photo.caption}
                                            className={`${styles.image} w-full h-full object-cover p-3`}
                                        />
                                    </SRLWrapper>
                                </div>
                            </>
                        ))
                    )
                    : null}
            </div>
        </div >
    )

}

export default Photos

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}