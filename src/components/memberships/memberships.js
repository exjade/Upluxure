import MemberGold from './member-gold'
import MemberPlatinum from './member-platinum'
import MemberDiamond from './member-diamond'

const MembershipCards = () => {
    return (
        <div className="flex justify-evenly mt-8 mb-10 ">
            <MemberGold />
            <MemberDiamond />
            <MemberPlatinum />
        </div>
    )
}

export default MembershipCards
