import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/modules/profile/profile-information.module.css'
import ContentLoader from 'react-content-loader'

/* Import material ui icons */
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HeightIcon from '@mui/icons-material/Height';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Brightness1SharpIcon from '@mui/icons-material/Brightness1Sharp';

const ProfileInformation = ({
    profile: {
        Age,
        Height,
        Weight,
        Gender,
        Country,
        AboutMe,
        Language,
        BodyType,
        fullName,
        sxpreference,
        following = [],
        followers = [],
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername
    } }) => {

    return (
        <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
            <div className={`${styles.post} grid grid-cols-2 justify-around ml-8 mt-3`}>
                <h2 className={`${styles.fullname} capitalize`} >{fullName}</h2>
            </div>
            <div className={`${styles.abouttitle} grid grid-rows-2 gap-4 justify-between p-3`} >
                <p className='flex items-center justify-center font-bold'> About me </p>
                <div className={`${styles.about}`} >
                    {AboutMe}
                </div>
            </div>
            <div className={`${styles.information} grid grid-rows-3 gap-2 mt-5 mb-5`} >
                <p className='flex items-center justify-center font-bold'> Personal Information </p>
                <div className={`${styles.firstrow}`} >
                    <div className={`${styles.iconandinfo}`} >
                        <CakeIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`} >
                            <p className="font-medium capitaliza" >Age</p>
                            <p className="font-normal text-gray-info capitalize"> {Age} Years Old</p>
                        </div>
                    </div>
                    <div className={`${styles.iconandinfo}`} >
                        <LocationOnIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`} >
                            <p className="font-medium capitaliza" >From:</p>
                            <p className="font-normal text-gray-info capitalize">{Country}</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.secondrow}`} >
                    <div className={`${styles.iconandinfo}`}>
                        <RecordVoiceOverIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Language</p>
                            <p className="font-normal text-gray-info capitalize">{Language}</p>
                        </div>
                    </div >
                    <div className={`${styles.iconandinfo}`}>
                        <AccessibilityIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Body Type:</p>
                            <p className="font-normal text-gray-info capitalize">{BodyType}</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.thirdrow}`} >
                    <div className={`${styles.iconandinfo}`}>
                        <Brightness1SharpIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Weight:</p>
                            <p className="font-normal text-gray-info ">{Weight} KG</p>
                        </div>
                    </div>
                    <div className={`${styles.iconandinfo}`}>
                        <HeightIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Height:</p>
                            <p className="font-normal text-gray-info ">{Height} CM</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.fourrow}`} >
                    <div className={`${styles.iconandinfo}`}>
                        <Brightness1SharpIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Gender:</p>
                            <p className="font-normal text-gray-info ">{Gender}</p>
                        </div>
                    </div>
                    <div className={`${styles.iconandinfo}`}>
                        <HeightIcon sx={{ color: "#000" }} />
                        <div className={`${styles.profileinfo}`}>
                            <p className="font-medium capitaliza">Sexual Preference:</p>
                            <p className="font-normal text-gray-info ">{sxpreference}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ProfileInformation

ProfileInformation.propTypes = {
    ProfileInformation: PropTypes.array,
    Age: PropTypes.number,
    BodyType: PropTypes.string,
    Country: PropTypes.string,
    Height: PropTypes.number,
    Weight: PropTypes.number,
    AboutMe: PropTypes.string,
    Language: PropTypes.string,
    fullName: PropTypes.string,
}