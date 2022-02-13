import { useState } from 'react'
/* Components*/
import Unlock from './Unlocks'
/* Styles */
import styles from '../../../styles/modules/profile/Private.module.css'
/* Material UI  */
import DiamondIcon from '@mui/icons-material/Diamond';
/* Firebase, Firestore & Storage */
import { firebase } from '../../../lib/firebase'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const PremiumOptions = ({
  profile,
  profile: {
    token,
    docId,
    username
  }
}) => {

  /* Lock content */
  const [isLocked, setLock] = useState(false)

  const lockContent = () => {
    return <Unlock />
  }

  if (isLocked) {
    return lockContent()
  } else {

    return (
      <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
        <div className={`${styles.post} grid grid-cols-2 justify-around`}>
          <h2 className={`${styles.title} animate-bounce`} >Welcome to my Fan's Club!</h2>
          {/* Cambio de sección */}
        </div>
        <div className='grid gap-8 justify-center p-3'>
          <div className={`${styles.description}`} >
            <p>Suscribe to get access to exclusive content</p>
          <p className={`${styles.moreinfo}`} >and other incredible benefits!</p>
          </div>

          <div className={`${styles.content_container}`} >
            <div className={`${styles.pictures}`} >
              <p className="text-2xl font-semibold" >57</p>
              <p className="text-sm font-medium">Pictures</p>
            </div>
            <div className={`${styles.videos}`} >
              <p className="text-2xl font-semibold">38</p>
              <p className="text-sm font-medium">videos</p>
            </div>
          </div>


          <div className={`${styles.button_payment}`}>
            <button>
              <DiamondIcon />
              Join Fan's Club
            </button>
          </div>
        </div>
      </div >
    )
  }
}

export default PremiumOptions