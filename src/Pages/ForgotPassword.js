import React, { useRef, useState } from 'react'
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../Contexts/authContext'
import {
    Card,
    Input,
    FormControl,
    FormLabel,
    CardContent,
    Alert,
    TextField,
    Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

    return (
        // <>
        //   <Card>
        //     <CardBody>
        //       <h2 className="text-center mb-4">Password Reset</h2>
        //       {error && <Alert variant="danger">{error}</Alert>}
        //       {message && <Alert variant="success">{message}</Alert>}
        //       <Form onSubmit={handleSubmit}>
        //         <Form.Group id="email">
        //           <Form.Label>Email</Form.Label>
        //           <Form.Control type="email" ref={emailRef} required />
        //         </Form.Group>
        //         <Button disabled={loading} className="w-100" type="submit">
        //           Reset Password
        //         </Button>
        //       </Form>
        //       <div className="w-100 text-center mt-3">
        //         <Link to="/login">Login</Link>
        //       </div>
        //     </CardBody>
        //   </Card>
        //   <div className="w-100 text-center mt-2">
        //     Need an account? <Link to="/signup">Sign Up</Link>
        //   </div>
        // </>
        <>
            <Card>
                <CardContent>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {/* {JSON.stringify({ currentUser })} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormControl
                            type="email"
                            // inputRef={emailRef}
                        />
                        <TextField
                            type="text"
                            className="email-address"
                            placeholder="example@lion.lmu.edu"
                            inputRef={emailRef}
                            required
                        />
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            // inputRef={passwordRef}
                        />
                        <TextField
                            type="text"
                            className="password"
                            placeholder="password"
                            // inputRef={passwordRef}
                            required
                        />

                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl
                            type="password"
                            // ref={passwordConfirmRef}
                        />
                        <TextField
                            type="text"
                            className="password-confirm"
                            placeholder="confirm password"
                            // inputRef={passwordConfirmRef}
                            required
                        />

                        <div className="button1">
                            <Button
                                disabled={loading}
                                className="w-100"
                                type="submit"
                                className="btn1"
                                size="medium"
                                variant="outlined"
                                color="secondary"
                            >
                                Continue to Profile
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}
