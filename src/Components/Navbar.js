// import React, { useState } from 'react'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import HelpIcon from '@mui/icons-material/Help'

import Dropdown from './Dropdown'

const useStyles = makeStyles((theme) => ({
    helpButton: {
        marginRight: theme.spacing(2),

        justifyContent: 'start',
    },

    actionButtons: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    // theres a better way to have space between help and menu items but this good for now
    space: {
        flexGrow: '1',
    },
}))

const Navbar = () => {
    const classes = useStyles()
    // const [open, setOpen] = useState(false)

    // const handleOpen = () => {
    //     setOpen(true)
    // }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    return (
        <AppBar position="static">
            <Toolbar style={{ backgroundColor: 'white' }}>
                <IconButton
                    edge="start"
                    color="black"
                    aria-label="help"
                    className={classes.helpButton}
                >
                    <HelpIcon />
                </IconButton>
                <Typography className={classes.space}></Typography>
                <div style={{ justifyContent: 'end', position: 'flex' }}>
                    <Button className={classes.actionButtons}>members</Button>
                    <Button className={classes.actionButtons}>groups</Button>
                    <Button className={classes.actionButtons}>saved</Button>
                    <Button className={classes.actionButtons}>chat</Button>
                    <Button>
                        <Dropdown className={classes.actionButtons}></Dropdown>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
