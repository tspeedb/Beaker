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
// import { Form, Button, Card, Alert } from 'react-bootstrap'
import 'firebase/compat/auth'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../Contexts/authContext'
import { TextField } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { connectStorageEmulator } from 'firebase/storage'

function NewUserStudent() {
    const { signup } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState(null)
    // const [user, loading, error] = useAuthState(auth)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    // const user = auth.currentUser

    async function handleSubmit(e) {
        console.log('getting here 1')
        e.preventDefault()
        validatePassword()
        try {
            // setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/studentprofile')
            console.log('created User' + currentUser.uid)
            // auth().onAuthStateChanged(function (user) {
            //     if (user === null) {
            //         console.log('gets here to nav')
            //         const uid = user.uid
            //         console.log('created User' + user.uid)
            //         history.push('/studentprofile')
            //     }
            // })
        } catch {
            setError('Failed to Create an Account')
        }

        setLoading(false)
    }
    function validatePassword() {
        if (passwordRef.current.value !== passwordConfirmRef.current.value)
            return setError('Passwords do not Match')
    }
    return (
        <div className="top-signin">
            <Box
                component="img"
                sx={{
                    height: 60,
                    width: 60,
                }}
                alt="logo"
                src={beaker}
            />
            <h2 className="sign-up">Sign Up</h2>
            {/* {JSON.stringify({ currentUser })} */}
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <FormControl type="email" />
                <div className="email-text-field">
                    <TextField
                        type="text"
                        className="email-address"
                        placeholder="Email (example@lion.lmu.edu)"
                        inputRef={emailRef}
                        required
                        style={{
                            width: '20em',
                            marginBottom: '1em',
                        }}
                    />
                </div>
                <FormControl type="password" />
                <div className="password-text-field">
                    <TextField
                        type="password"
                        className="password"
                        placeholder="Password"
                        inputRef={passwordRef}
                        required
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
                        required
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
                        Continue to Profile
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NewUserStudent
