import React from 'react'
/* Styles */
import styles from '../../../styles/modules/messenger/private-chat/private-chat.module.css'
import '../../../styles/css/messenger/private-chat/private-chat.css'
/* Material UI */
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';


const Send = ({
    text,
    setText,
    handleSubmit,
    setImg,
}) => {

    const isInvalid = text === '' || setImg === '';

    return (
        <div className={`${styles.send_container} mt-8 flex max-w-screen-lg`} >
            <div className={styles.send_border} >
                <form
                    className={`${styles.send_wrapper_form}`}
                    onSubmit={handleSubmit}
                >

                    <div className={`${styles.send_upload_img}`} >
                        <label htmlFor='img'>
                            <InsertPhotoIcon className={styles.send_photo_icon} />
                        </label>
                        <input
                            onChange={(event) => setImg(event.target.files[0])}
                            type='file'
                            id='img'
                            accept='image/*'
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className={`${styles.send_text}`} >
                        <input
                            type="text"
                            placeholder='Send a message'
                            className={styles.send_input}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className={`${styles.send_btn_container} `} >
                        <button 
                        disabled={isInvalid}
                        className={`${styles.send_btn} ${isInvalid && 'opacity-70'}`} 
                        
                        >
                            <SendIcon className={styles.send_btn_icon} />
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Send
