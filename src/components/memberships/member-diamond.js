import styles from '../../styles/modules/memberships/memberships.module.css'
/*MUI*/
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

const MemberDiamond = () => {
    return (
        <div className={`${styles.diamond} text-white-primary`} >
            <div className='flex flex-col'>

            <div className={styles.gold_container} >
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/upluxure.appspot.com/o/images%2Fbadge_roles%2Fdiamond.png?alt=media&token=36ab1cd8-f9b5-49ca-a708-d55f199c7d3a"
                        alt="diamond member" 
                        className={`${styles.gold_img}`}
                        />
                </div>

                <div className={`${styles.title} flex ml-5 mt-5 uppercase font-bold text-2xl`} >
                    <p className={styles.diamondtitle} >Diamond</p>
                </div>

                <div className='flex flex-col mt-5 justify-center items-center'>
                    <div className='font-normal text-2xl'>
                        <p>$79.99 / USD</p>
                    </div>
                    <div className='text-gray-primary text-sm mt-3'>
                        <p className='mb-3'> Non-Recurring Payment </p>
                    </div >
                </div>

                <div className='mt-5 flex justify-center items-center'>
                    <button className="bg-badges-diamond hover:bg-white-normal text-white-normal animate-bounce hover:text-badges-diamond font-bold py-2 px-4 border-b-4 rounded w-10/12">
                        Buy Diamond
                    </button>
                </div>

                <div className='flex mt-5 justify-center items-center'>
                    <span className={`${styles.containerbenefits} grid`} >
                        <Tooltip
                            title="Page currency"
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 10, width: '100%' }}
                        >
                            <p className={`${styles.benefits} flex gap-3 mb-5 mt-5 cursor-pointer hover:text-white-normal`} ><CheckIcon className="flex items-center justify-center " /> 350 Lux's</p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Badges make you more attractive and distinguish you from other users."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 10, width: '50%' }}
                        >
                            <p className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} ><CheckIcon className="flex items-center justify-center" />Diamond Badge</p>
                        </Tooltip>
                        <Divider className={styles.divider} />
                        <Tooltip
                            title="Start private conversations with another luxer's."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 mt-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Unlimited Chats
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Upload your own photos on Upluxure."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 mt-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Upload Photos
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="A way for you to test new features before they are released for everyone."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Beta Features
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Set your profile public or private."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Profile (Public or Private)
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Add your website URL in your profile."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Website Link
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Discover your account Statistics."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Statistics
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                        <Tooltip
                            title="Priority support."
                            enterDelay={400}
                            leaveDelay={100}
                            sx={{ m: 1, width: 10 }}
                        >
                            <p
                                className={`${styles.benefits} flex gap-3 mb-5 hover:text-white-normal cursor-pointer`} >
                                <CheckIcon className="flex items-center justify-center " />
                                Priority Support 24/7
                            </p>
                        </Tooltip>
                        <Divider className={`${styles.divider}`} />
                    </span>
                </div>

            </div>
        </div>
    )
}

export default MemberDiamond