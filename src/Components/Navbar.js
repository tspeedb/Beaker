// import React, { useState } from 'react'
import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Button, Menu } from '@material-ui/core'
import HelpIcon from '@mui/icons-material/Help'
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import '../Styles/Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ScienceIcon from '@mui/icons-material/Science'

import Dropdown from './Dropdown'
import MenuList from '@material-ui/core/MenuList'

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
    paper: {
        marginRight: theme.spacing(2),
    },
}))

const Navbar = () => {
    const classes = useStyles()
    const [item, setItem] = useState(null)
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    const prevOpen = useRef(open)
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }

        prevOpen.current = open
    }, [open])

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
                        color="white"
                        aria-label="help"
                        className={classes.helpButton}
                    >
                        <ScienceIcon
                            style={{ fontSize: 'larger', color: 'white' }}
                        />
                    </IconButton>
                    <Typography className={classes.space}></Typography>
                    <div
                        style={{
                            justifyContent: 'end',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
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

                        {/* <Button
                            aria-controls="menu"
                            onMouseOver={handleMenuOpen}
                            className={classes.actionButtons}
                        ></Button> */}

                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={
                                    open ? 'menu-list-grow' : undefined
                                }
                                aria-haspopup="true"
                                onClick={handleToggle}
                                style={{ color: 'white' }}
                            >
                                <AccountCircleIcon />
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom'
                                                    ? 'center top'
                                                    : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}
                                            >
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="menu-list-grow"
                                                    onKeyDown={
                                                        handleListKeyDown
                                                    }
                                                >
                                                    <MenuItem
                                                        onClick={handleClose}
                                                    >
                                                        Profile
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={handleClose}
                                                    >
                                                        <Link to="/">
                                                            {' '}
                                                            Logout{' '}
                                                        </Link>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
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
                <MenuList onClick={handleMenuClose}>
                    {' '}
                    <Link to="./">logout </Link>{' '}
                </MenuList>
            </Menu>
        </>
    )
}

export default Navbar
