import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { auth } from '../firebase'
import 'firebase/compat/auth'
import {
    Card,
    Input,
    FormControl,
    FormLabel,
    CardContent,
    Alert,
    TextField,
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../Contexts/authContext'
import { connectStorageEmulator } from 'firebase/storage'

function SignIn() {
    const { signin, currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/dashboard')
            console.log('history is dashboard')
        } catch {
            setError('Failed to Signin')
        }
        setLoading(false)
        console.log('currentUser logedin' + JSON.stringify({ currentUser }))
    }

    return (
        // <div className="sign-in">
        //     <div className="top-signin">
        //         <img src={beaker} alt="logo" />
        //         <p className="signin">Login</p>
        //         <div></div>
        //         <input
        //             type="text"
        //             className="email-address"
        //             placeholder="LMU/LLS email"
        //         />
        //         <div></div>
        //         <br></br>
        //         <input
        //             type="text"
        //             className="password"
        //             placeholder="password"
        //         />
        //         <div></div>
        //         <br></br>
        //         <div className="button1">
        //             <Button
        //                 className="btn1"
        //                 size="large"
        //                 variant="outlined"
        //                 color="primary"
        //             >
        //                 Sign In
        //             </Button>
        //         </div>
        //         <div></div>
        //         <br></br>
        //         <div className="button2">
        //             <Button className="btn2" size="medium" color="secondary">
        //                 Forgot Password?
        //             </Button>
        //         </div>
        //         <br></br>
        //         <br></br>
        //         <div className="button3">
        //             <Link className="button-link" to="./newuserstudent">
        //                 <Button className="btn3" size="medium" color="error">
        //                     New Here?
        //                 </Button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <>
            <Card>
                <CardContent>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {JSON.stringify({ currentUser })}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormControl
                            type="email"
                            inputRef={emailRef}
                            required
                        />
                        <TextField
                            type="text"
                            className="email-address"
                            placeholder="example@lion.lmu.edu"
                            inputRef={emailRef}
                        />
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            inputRef={passwordRef}
                            required
                        />
                        <TextField
                            type="text"
                            className="password"
                            placeholder="password"
                            inputRef={passwordRef}
                        />
                        <div className="button1">
                            {/* <Link to="/dashboard">Sign In</Link> */}

                            <Button
                                disabled={loading}
                                className="w-100"
                                type="submit"
                                className="btn1"
                                size="medium"
                                variant="outlined"
                                color="secondary"
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="button3">
                            <Link to="./newuserstudent">New Here? </Link>
                        </div>
                        {/* <Button
                                    className="btn3"
                                    size="medium"
                                    color="error"
                                >
                                    Sign Up?
                                </Button> */}
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignIn
