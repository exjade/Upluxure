import React, { useState, useEffect } from 'react';
import MemberGold from './member-gold'
import MemberPlatinum from './member-platinum'
import MemberDiamond from './member-diamond'
import '../../styles/modules/memberships/memberships.css'

/* MATERIAL UI*/
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import StarsIcon from '@mui/icons-material/Stars';

const MembershipCards = () => {

    /* Mobile */
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 840);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [])

    /* Component Switch*/
    const [openTabs, setOpenTabs] = useState({
        showGold: false,
        showDiamond: true,
        showPlatinum: false
    });

    const showMemberGold = () => {
        if (openTabs.showGold) {
            <MemberGold />

        }
    }
    const showMemberDiamond = () => {
        if (openTabs.showDiamond) {
            <MemberDiamond />
        }
    }
    const showMemberPlatinum = () => {
        if (openTabs.showPlatinum) {
            <MemberPlatinum />
        }
    }
    /* Switch Icons */
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {
                isDesktop ? (
                    <>
                        <div className="upluxure_membresias_breakpoints flex justify-evenly mt-8 mb-10 ">
                            <MemberGold />
                            <MemberDiamond />
                            <MemberPlatinum />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center mt-5">
                            {/* TABS */}
                            <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" >
                                <Tab
                                    icon={<StarsIcon
                                        sx={openTabs.showGold ? { color: "#FE8200" } : { color: '#696969' }} />} aria-label="photo"
                                    onClick={() => showMemberGold(setOpenTabs({ showDiamond: false, showGold: true, showPlatinum: false }))}
                                />
                                <Tab
                                    icon={<StarsIcon
                                        sx={openTabs.showDiamond ? { color: "#003BB6" } : { color: '#696969' }} />} aria-label="information"
                                    onClick={() => showMemberDiamond(setOpenTabs({ showDiamond: true, showGold: false, showPlatinum: false }))}
                                />
                                <Tab
                                    icon={<StarsIcon
                                        sx={openTabs.showPlatinum ? { color: "#435157" } : { color: '#696969' }} />} aria-label="information"
                                    onClick={() => showMemberPlatinum(setOpenTabs({ showPlatinum: true, showDiamond: false, showGold: false }))}
                                />
                            </Tabs>
                        </div>
                        <div className="upluxure_membresias_breakpoints flex justify-center mb-10 overflow-hidden">
                            {
                                openTabs.showGold && !openTabs.showDiamond && !openTabs.showPlatinum ?
                                    (<MemberGold />)
                                    :
                                    openTabs.showDiamond ?
                                        (<MemberDiamond />)
                                        :
                                        openTabs.showPlatinum ?
                                            (<MemberPlatinum />)
                                            :
                                            null
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default MembershipCards
