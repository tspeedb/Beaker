// import React, { useState } from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Button, Menu } from '@material-ui/core'
import HelpIcon from '@mui/icons-material/Help'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import Dropdown from './Dropdown'
import { MenuList } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    helpButton: {
        marginRight: theme.spacing(2),

        justifyContent: 'start',
    },

    actionButtons: {
        color: 'white',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    // theres a better way to have space between help and menu items but this good for now
    space: {
        flexGrow: '1',
    },

    links: {
        color: 'white',
        textDecoration: 'none',
    },
}))

const Navbar = () => {
    const classes = useStyles()
    const [item, setItem] = useState(null)

    const handleMenuOpen = (event) => {
        setItem(event.currentTarget)
    }

    const handleMenuClose = () => {
        setItem(null)
    }
    // const [open, setOpen] = useState(false)

    // const handleOpen = () => {
    //     setOpen(true)
    // }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: 'black' }}>
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
                        <Button className={classes.actionButtons}>
                            {' '}
                            <Link className={classes.links} to="/allmembers">
                                {' '}
                                members{' '}
                            </Link>
                        </Button>
                        <Button className={classes.actionButtons}>
                            {' '}
                            <Link className={classes.links} to="/projectspage">
                                projects{' '}
                            </Link>
                        </Button>
                        <Button className={classes.actionButtons}>
                            {' '}
                            <Link className={classes.links} to="/dashboard">
                                dashboard{' '}
                            </Link>
                        </Button>

                        <Button
                            aria-controls="menu"
                            onMouseOver={handleMenuOpen}
                            className={classes.actionButtons}
                        >
                            <AccountCircleIcon />
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Menu
                style={{ marginTop: '50px' }}
                onClose={handleMenuClose}
                id="menu"
                anchorEl={item}
                open={Boolean(item)}
            >
                {' '}
                <MenuList onClick={handleMenuClose}>
                    {' '}
                    <Link to="./userprofile">profile </Link>{' '}
                </MenuList>
                <MenuList onClick={handleMenuClose}> logout</MenuList>
            </Menu>
        </>
    )
}

export default Navbar
