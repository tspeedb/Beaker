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
import { connectStorageEmulator } from 'firebase/storage'

function UserProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
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

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                setError('Failed to update account')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        // <form onSubmit={handleSubmit}>
        //     <div className="sign-in">
        //         <div className="top-signin">
        //             <img src={beaker} alt="logo" />
        //             <h1>New User</h1>
        //             <p className="signin">Login Information</p>
        //             <div></div>
        //             <Form.Group id="email">
        //                 <Form.Label>Email</Form.Label>
        //                 <Form.Control type="email" ref={emailRef} required />
        //             </Form.Group>
        //             {JSON.stringify({ currentUser })}
        //             <TextField
        //                 type="text"
        //                 className="email-address"
        //                 placeholder="example@lion.lmu.edu"
        //                 inputRef={emailRef}
        //             />
        //             <div></div>
        //             <br></br>
        //             <TextField
        //                 type="text"
        //                 className="password"
        //                 placeholder="password"
        //                 inputRef={passwordRef}
        //             />
        //             <div></div>
        //             <br></br>
        //             <TextField
        //                 type="text"
        //                 className="password-confirm"
        //                 placeholder="confirm password"
        //                 inputRef={passwordConfirmRef}
        //             />
        //             <div></div>
        //             <br></br>
        //             <div className="button1">
        //                 {/* {error && <Alert severity="error">{error}</Alert>} */}
        //                 {/* <Link className="button-link" to="/studentprofile"> */}
        //                 <Button
        //                     disabled={loading}
        //                     className="btn1"
        //                     size="medium"
        //                     variant="outlined"
        //                     color="secondary"
        //                     // onSubmit={handleSubmit}
        //                 >
        //                     Continue to Profile
        //                 </Button>
        //                 {/* </Link> */}
        //             </div>
        //         </div>
        //     </div>
        // </form>

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
                <FormControl
                    type="email"
                    // inputRef={emailRef}
                />
                <div className="update-email-text-field">
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
                <FormControl
                    type="password"
                    // inputRef={passwordRef}
                />
                <div className="update-password-text-field">
                    <TextField
                        type="text"
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
                <FormControl
                    type="password"
                    // ref={passwordConfirmRef}
                />
                <div className="confirm-password-text-field">
                    <TextField
                        type="text"
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
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile
