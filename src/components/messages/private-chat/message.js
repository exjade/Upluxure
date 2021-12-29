import React, { useEffect, useRef } from 'react'
import Moment from 'react-moment'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
import '../../../styles/css/messenger/private-chat/private-chat.css'
import { SRLWrapper } from "simple-react-lightbox";

const Message = ({ msgs, CurrentLoggedInUser }) => {
    // console.log(msgs.media)
    /* Hook Scroll To Bottom */
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [msgs]);

    /* SRLWrapper */
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
        <>

            {
                msgs.length ?
                    msgs.map((msg, i) =>
                        <div
                            key={msg.from + msg.createdAt + i}
                            className={`  ${msg.from === CurrentLoggedInUser ?
                                `${styles.message_conteiner}`
                                : `${styles.message_friend_container}`}
                                        items-center flex flex-col justify-center max-w-screen-lg w-full
            `}
                        >
                            <div
                                className={`${styles.message_wrapper} 
                                `}
                                ref={messagesEndRef}
                            >
                                {
                                    msg.media ?
                                        <SRLWrapper options={options}>
                                            <img
                                                src={msg.media}
                                                alt={msg.text}
                                                className={`${styles.message_media}`}
                                            />
                                        </SRLWrapper>
                                        : null
                                }
                                <div className={` 
                                ${msg.from === CurrentLoggedInUser ?
                                        `${styles.message_text_container}`
                                        : `${styles.message_friend}`}`}
                                >
                                    <p className={`${styles.message_text}`} >
                                        {msg.text}
                                    </p>
                                </div>
                                <div className={`${styles.message_date}`}
                                >
                                    <small>
                                        <Moment fromNow>
                                            {msg.createdAt.toDate()}
                                        </Moment>
                                    </small>
                                </div>
                            </div>
                        </div>
                    )
                    : null
            }

        </>
    )
}

export default Message
