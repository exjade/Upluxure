
import styles from '../../styles/modules/memberships/background.module.css'
const Background = () => {
    return (
        <div className={`${styles.background} flex justify-center items-center flex-col`} >
            <span className="text-white-normal flex flex-row mb-4 mt-3">
                <p className="capitalize text-4xl">Flexible </p>
                <p className="capitalize ml-3 text-4xl ">Plans</p>
            </span>
            <p className="text-white-ctitle mb-3 font-mono">Choose a plan that works best for you</p>
        </div>
    )
}

export default Background
