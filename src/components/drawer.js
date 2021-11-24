import {useState} from 'react';
import '../styles/css/drawer.css'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ViewAllComments from './comments/view-all-comments';

export default function Drawer() {

    const [open, setOpen] = useState(false)

    return (
        <div className="drawer__container">
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
            >
                <MenuIcon/> 
            </IconButton>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => { }}
            >
                <div>
                    <Box
                        textAlign="center"
                        className="p-3 "
                    >
                        <ViewAllComments />
                    </Box>
                </div>
            </SwipeableDrawer>
        </div>
    )
}