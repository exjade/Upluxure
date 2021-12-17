import {useState, useEffect} from 'react'
import Header from './header'
import MembershipCards from './memberships'
import Background from './background'

const MemberShip = () => {
    /* Mobile */
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 840);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])
    return (
        <>
            {
                isDesktop ? (
                    <>
                        <Header />
                        <Background />
                        <MembershipCards />
                    </>
                ) : (
                    <>
                        <Header />
                        <MembershipCards />
                    </>
                )
            }

        </>
    )
}

export default MemberShip
