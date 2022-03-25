import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'firebase/compat/auth'
import {
    Card,
    Input,
    FormControl,
    CardContent,
    Alert,
    TextField,
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../Contexts/authContext'
import { connectStorageEmulator } from 'firebase/storage'
import { Box } from '@mui/system'

export default function SignIn() {
    const { signin, currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/dashboard')
            setLoading(true)
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
        // console.log('currentUser logedin' + JSON.stringify({ currentUser }))
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
            <h2 className="sign-in">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <FormControl
                    type="email"
                    inputRef={emailRef}
                    // required
                />
                <div className="email-text-field">
                    <TextField
                        type="text"
                        className="email-address"
                        placeholder="Email (example@lion.lmu.edu)"
                        inputRef={emailRef}
                        required
                        style={{ width: '20em', marginBottom: '1em' }}
                    />
                </div>
                <FormControl
                    type="password"
                    inputRef={passwordRef}
                    // required
                />
                <div className="password-text-field">
                    <TextField
                        type="password"
                        className="password"
                        placeholder="Password"
                        inputRef={passwordRef}
                        required
                        style={{
                            width: '20em',
                            marginBottom: '2em',
                        }}
                    />
                </div>
                <div className="sign-in-button">
                    <Button
                        disabled={loading}
                        className="signin-button"
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: '3em' }}
                    >
                        Sign In
                    </Button>
                </div>
                <div className="forgot-password">
                    <Link to="./forgotpassword">Forgot Password </Link>
                </div>
                <div className="new-here">
                    <Link to="./newuserstudent">New Here? </Link>
                </div>
            </form>
        </div>
    )
}
