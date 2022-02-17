import { useState, useEffect } from 'react'
/* Components*/
import Unlock from './Unlocks'
import useUser from '../../../hooks/use-user'
/* UUID */
import { v4 as uuidv4 } from 'uuid';
/* Styles */
import styles from '../../../styles/modules/profile/Private.module.css'
/* Material UI  */
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckIcon from '@mui/icons-material/Check';
/* Firebase, Firestore & Storage */
import { firebase, FieldValue } from '../../../lib/firebase'
import { getFirestore, updateDoc, doc, addDoc, serverTimestamp, collection, increment } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const PremiumOptions = ({
  profile: {
    docId: modelDocId,
    username,
    photoURL,
    userId: modelId,
    clubMember
  }
}) => {
  const {
    user: {
      username: currentUserUsername,
      docId: clientDocId,
      token: clientTokenBalance,
      userId: clientId }
  } = useUser()
  /* Fan Club */
  const [isBecomingFan, setIsBecomingFan] = useState(false)
  const [isFanError, setIsFanError] = useState('')
  const [isFanProcessing, setIsFanProcessing] = useState('')

  async function getFanStatus() {
    try {

      if (clientTokenBalance !== null
        && clientTokenBalance > 0
        && clientTokenBalance !== undefined
        && clientTokenBalance !== -0
        && clientTokenBalance >= 90
      ) {
        // User pay for fan club
        const clientBalanceRef = doc(firestore, "users", clientDocId)
        await updateDoc(clientBalanceRef, {
          token: increment(-90),
        })
        setIsFanProcessing('Processing...')
        // Payment information
        const docSuccessRef = await addDoc(collection(firestore, "FanClubCompleted", 'modelID', modelId, clientId, 'ticket'), {
          Transaction: 'Completed',
          ClientID: clientId,
          ClientUsername: currentUserUsername,
          ModelUsername: username,
          ModelID: modelId,
          Amount: 90,
          Date: serverTimestamp(),
          Concept: 'Fan Club Membership',
          ticketID: uuidv4(),
        });
        window.location.reload()
      } else {
        setIsFanError('insufficient funds, please top up')
        const docFailedRef = await addDoc(collection(firestore, "FanClubFailed", 'modelID', modelId, clientId, 'ticket'), {
          Transaction: 'Declined',
          ClientUsername: currentUserUsername,
          ModelUsername: username,
          ClientID: clientId,
          ModelID: modelId,
          Amount: 90,
          Date: serverTimestamp(),
          Concept: 'Fan Club Membership',
          ticketID: uuidv4(),
        });
      }
      if (clientTokenBalance !== null
        && clientTokenBalance > 0
        && clientTokenBalance !== undefined
        && clientTokenBalance !== -0
        && clientTokenBalance > 90
      ) {
        // Model gets paid for fan club
        const modelBalanceRef = doc(firestore, "users", modelDocId)
        await updateDoc(modelBalanceRef, {
          token: increment(90),
          clubMember: FieldValue.arrayUnion(clientId)
        })
      } else {
        setIsFanError('insufficient funds, please top up')
      }
    } catch (error) {
      console.error(error)
      setIsFanError('insufficient funds, please top up')
      setIsFanError('')
    }

  }

  const arraysContaineMemberId = clubMember?.includes(clientId)

  /* Lock content */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  }, [])
  const [isLoading, setIsLoading] = useState(true);
  const loader = () => { return <p className="bg-black-background">.</p> }

  if (isLoading) {
    return loader()
  } else {
    return (
      <>
        {/* INICIO */}
        {
          arraysContaineMemberId && currentUserUsername ? (
            <>
              <Unlock />
            </>
          ) : (
            <>
              <div className={`${styles.background} h-16 border-t border-gray-primary mt-12 pt-4`} >
                <div className={`${styles.post} grid grid-cols-2 justify-around`}>
                  <h2 className={`${styles.title}`} >Welcome to my Fan's Club!</h2>
                  {/* Cambio de sección */}
                </div>
                <div className='grid gap-8 justify-center p-3'>
                  <div className={`${styles.description}`} >
                    <p>Suscribe to get access to exclusive content and other incredible benefits!</p>
                    {/* <p className={`${styles.moreinfo}`} ></p> */}
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
                    <button
                      type="button"
                      onClick={() => setIsBecomingFan(true)}
                    >
                      <DiamondIcon />
                      Join Fan's Club
                    </button>
                  </div>

                  {/* MODAL */}
                  {isBecomingFan ? (
                    <div className={`${styles.modal} `} >

                      <div className={`${styles.main_container}`} >
                        {/* HEADER */}
                        <div className={`${styles.modal_header}`}>
                          {/* HEADER TITLE */}
                          <div className={styles.header_container}>
                            <div className={styles.header_imagediv} >
                              <img
                                src={photoURL}
                                alt="profile_picture"
                                className='rounded-full h-20 w-20'
                              />
                            </div>
                            <div className={styles.modal_header_title}>
                              <h4 className={`${styles.modal_header_text} capitalize`}>Suscribe to {username} Fan's club</h4>
                              {/* HEADER INFO */}
                            </div>
                          </div>
                        </div>

                        {/* BODY */}
                        <div className={`${styles.modal_body}`}>
                          <div className={`${styles.modal_body_title}`} >
                            <DiamondIcon />
                            <p className='font-bold text-3x1'>Fan's Club</p>
                          </div>
                          <div className={styles.benefits} >
                            <h3 className='mb-5 font-semibold '>Benefits:</h3>
                            <div className={styles.list} >
                              <span className={styles.list_child} >
                                <CheckIcon /> <p>Unlimited chat with the model</p>
                              </span>
                              <span className={styles.list_child} >
                                <CheckIcon /> <p>Payment Request's</p>
                              </span>
                              <span className={styles.list_child} >
                                <CheckIcon /> <p>Nude Content</p>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.error}>
                          {isFanError ? (

                            <p className={`text-red-like text-center`} >{isFanError}</p>
                          ) : (

                            <p className={`text-green-button text-center`} >{isFanProcessing}</p>
                          )}
                        </div>
                        {/* FOOTER */}
                        <div className={`${styles.payment_options}`} >
                          <button
                            type="button"
                            className={styles.payment_button}
                            onClick={() => getFanStatus()}
                          >
                            Pay 90 Lux's
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsBecomingFan(false)}
                            className={styles.cancel_button}
                          >
                            Cancel
                          </button>
                        </div>

                      </div>

                    </div>
                  ) : (null)}
                </div>
              </div >
            </>
          )
        }

        {/* FIN */}
      </>
    )
  }
}

export default PremiumOptions