import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import {
    Card,
    Input,
    FormControl,
    FormLabel,
    CardContent,
    Box,
} from '@mui/material'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Alert } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import 'firebase/compat/auth'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../Contexts/authContext'
import { TextField } from '@mui/material'
import { connectStorageEmulator } from 'firebase/storage'

function UserProfile() {
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, signout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push('/dashboard')
            })
            .catch(() => {
                setError('Failed to update account')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    /*Acknowelgment for setting Promises
      Author:WebDevSimplified
    */

    async function tempLogout(f) {
        f.preventDefault()
        try {
            console.log(currentUser)
            console.log('gets to logout beg ye')
            await signout()
            history.push('/')
            console.log('you are logged out')
            console.log(currentUser + ' I should be null')
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <div className="top-update-profile">
            <Box
                component="img"
                sx={{
                    height: 60,
                    width: 60,
                }}
                alt="logo"
                src={beaker}
            />
            <h2 className="profile">Profile</h2>
            {/* {JSON.stringify({ currentUser })} */}
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <FormControl type="password" />
                <div className="update-password-text-field">
                    <TextField
                        type="password"
                        className="password"
                        placeholder="Password"
                        inputRef={passwordRef}
                        style={{
                            width: '20em',
                            marginBottom: '1em',
                        }}
                    />
                </div>
                <FormControl type="password" />
                <div className="confirm-password-text-field">
                    <TextField
                        type="password"
                        className="password-confirm"
                        placeholder="Confirm Password"
                        inputRef={passwordConfirmRef}
                        style={{
                            width: '20em',
                            marginBottom: '3em',
                        }}
                    />
                </div>
                <div className="continue-to-profile-button">
                    <Button
                        disabled={loading}
                        type="submit"
                        className="continue-to-profile-btn"
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        Update
                    </Button>
                </div>

                <div className="cancel">
                    <Link to="./dashboard">Cancel</Link>
                </div>
            </form>
            <div className="continue-to-profile-button">
                <Button
                    disabled={loading}
                    type="submit"
                    className="continue-to-profile-btn"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={tempLogout}
                >
                    TempLogout
                </Button>
            </div>
        </div>
    )
}

export default UserProfile
