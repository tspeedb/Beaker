import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Contexts/userauth.js'

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [load, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (
            passwordRef.current.value !== passwordConfirmationRef.current.value
        ) {
            return setError('Passwords do not Match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to Create Account, Please Try again')
        }
        setLoading(false)
    }
    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <p className="signin">Login</p>
                <div></div>
                <input
                    type="text"
                    className="email-address"
                    placeholder="LMU/LLS email"
                    inputRef={emailRef}
                    required
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                    inputRef={passwordRef}
                    required
                />
                <div></div>
                <br></br>
                <div className="button1"></div>
                <Button
                    className="btn1"
                    size="large"
                    variant="outlined"
                    color="primary"
                >
                    Sign In
                </Button>
                <div></div>
                <br></br>
                <div className="button2">
                    <Button className="btn2" size="medium" color="secondary">
                        Forgot Password?
                    </Button>
                </div>
                <br></br>
                <br></br>
                <div className="button3">
                    <Link className="button-link" to="./newuserstudent">
                        <Button className="btn3" size="medium" color="error">
                            New Here?
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
