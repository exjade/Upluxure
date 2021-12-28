import React from 'react'
import Moment from 'react-moment'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
import '../../../styles/css/messenger/private-chat/private-chat.css'

const Message = ({msgs}) => {

    console.log(msgs.media)

    return (
        <div className={`message items-center mt-8 flex justify-center max-w-screen-lg w-full`} >
            {
                msgs.length ?
                    msgs.map((msg, i) =>
                        <>
                            <div
                                className={`${styles.message_wrapper}`}
                                key={i}
                            >
                                {
                                    msg.media ? <img src={msg.media} alt={msg.text} />
                                        : null
                                }
                                {msg.text}
                                <small>
                                    <Moment fromNow>
                                        {msg.createdAt.toDate()}
                                    </Moment>
                                </small>
                            </div>
                        </>
                    )
                    : null
            }
        </div>
    )
}

export default Message
