import React, { useState, useEffect } from 'react';
import MemberGold from './member-gold'
import MemberPlatinum from './member-platinum'
import MemberDiamond from './member-diamond'

/* MATERIAL UI*/
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

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
        showGold: true,
        showDiamond: false
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
    /* Switch Icons */
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="upluxure_membresias_breakpoints flex justify-evenly mt-8 mb-10 ">
            {
                isDesktop ? (
                    <>
                        <MemberGold />
                        <MemberDiamond />
                        <MemberPlatinum />
                    </>
                ) : (
                    <>
                        <div className='flex justify-center items-center'>
                            {/* TABS */}
                            <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" className="IconsTab_color">
                                <Tab icon={<PhotoSizeSelectActualIcon sx={openTabs.showGold ? { color: "#fff" } : { color: '#696969' }} />} aria-label="photo" onClick={() => showMemberGold(setOpenTabs({ showDiamond: false, showGold: true }))} />
                                <Tab icon={<AccountBoxIcon sx={openTabs.showDiamond ? { color: "#fff" } : { color: '#696969' }} />} aria-label="information" onClick={() => showMemberDiamond(setOpenTabs({ showDiamond: true, showGold: false }))} />
                            </Tabs>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default MembershipCards
