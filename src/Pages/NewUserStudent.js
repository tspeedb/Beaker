import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import firebase from 'firebase/compat/app'
import UserForm from '../Components/UserForm'
import RequiredDialog from '../Components/RequiredDialog'

import {
    Card,
    Input,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    CardContent,
    Box,
} from '@mui/material'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Alert } from '@mui/material'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { db, auth } from '../firebase'
import { Form } from 'react-bootstrap'
import 'firebase/compat/auth'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '../Contexts/authContext'
import { TextField } from '@mui/material'
import { connectStorageEmulator } from 'firebase/storage'
import { RemoveDoneRounded } from '@mui/icons-material'
import { collection, getDocs, addDoc } from 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth'

import { registerWithEmailAndPassword } from '../authActions'

function NewUserStudent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [name, setName] = useState('')
    const [user, loading, error] = useAuthState(auth)
    const [activeStep, setActiveStep] = useState(0)
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleNext = () => {
        setActiveStep((nextStep) => nextStep + 1)
    }

    const checkAllRequiredValid = (reqValues) => {
        let invalid = reqValues.filter((x) => x.length === 0 || x === undefined)
        if (invalid.length >= 1) {
            setOpen(true)
            return false
        }
        return true
    }

    const { signup, currentUser } = useAuth()
    // const [users, setUsers] = useState([])
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [uid, setUid] = useState('')

    // const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)

    const [student, isStudent] = useState(false)

    // const auth = getAuth()
    // const user = auth.currentUser
    const firestore = firebase.firestore()

    const register = () => {
        // if (!email) alert('Please enter email')

        let valid = checkAllRequiredValid([
            displayName,
            lastName,
            email,
            password,
        ])
        if (!valid) return
        registerWithEmailAndPassword(displayName, lastName, email, password)
        history.push('/studentprofile')
        console.log(currentUser)
        console.log('currentUser is' + JSON.stringify({ currentUser }))
    }

    // console.log(values, handleChange)

    // async function handleSubmit(e) {
    //     console.log('getting here 1')
    //     e.preventDefault()
    //     // console.log(signUp)

    //     if (passwordRef.current.value !== passwordConfirmRef.current.value)
    //         return setError('Passwords do not Match')
    //     console.log('getting here maybe')
    //     try {
    //         setError('')
    //         setLoading(true)
    //         await signup(emailRef.current.value, passwordRef.current.value)
    //         console.log('getting here 2')
    //         console.log('currentUser is' + JSON.stringify({ currentUser }))
    //         history.push('/studentprofile')
    //     } catch {
    //         console.log('getting here maybe')
    //         setError('Failed to Create an Account')
    //     }
    //     setLoading(false)
    // }

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

        <div>
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
                <h1>New User</h1>
                <h2 className="sign-up">Sign Up</h2>

                <div></div>
                <FormControl type="name" />
                <div className="email-text-field">
                    <TextField
                        type="text"
                        className="email-address"
                        placeholder="First Name"
                        defaultValue={displayName}
                        label="First Name"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        // onChange={handleChange('firstName')}
                        required
                        style={{
                            width: '20em',
                            marginBottom: '1em',
                        }}
                    />
                </div>
                <FormControl type="name" />
                <div className="email-text-field">
                    <TextField
                        type="text"
                        className="email-address"
                        placeholder="Last Name"
                        label="Last Name"
                        defaultValue={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        // onChange={handleChange('lastName')}
                        required
                        style={{
                            width: '20em',
                            marginBottom: '1em',
                        }}
                    />
                </div>

                {/* <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                /> */}

                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <FormControl type="email" />
                <div className="email-text-field">
                    <TextField
                        type="text"
                        className="email-address"
                        placeholder="example@lion.lmu.edu"
                        label="Email"
                        // inputRef={emailRef}
                        defaultValue={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        // onChange={handleChange('email')}
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
                        placeholder="at least 6 character password"
                        label="Password"
                        // inputRef={passwordRef}
                        defaultValue={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        style={{
                            width: '20em',
                            marginBottom: '1em',
                        }}
                        required
                    />
                </div>
                <div className="continue-to-profile-button">
                    {/* <Link to="/studentprofile"> */}
                    <Button
                        className="btn1"
                        size="medium"
                        variant="outlined"
                        color="secondary"
                        onClick={register}
                    >
                        Continue To Profile
                    </Button>
                    {/* </Link> */}
                </div>

                {/* <input
                    type="text"
                    className="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@lion.lmu.edu"
                />
                <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                /> */}
                {/* <button className="register__btn" onClick={register}>
                    Register
                </button> */}
                {/* <button
                            className="register__btn register__google"
                            onClick={signInWithGoogle}
                        >
                            Register with Google
                        </button> */}

                {/* <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div> */}
            </div>
            <RequiredDialog
                onClickState={open}
                onClose={handleClose}
                fields={['First Name, Last Name, Email, Password']}
            />
        </div>
    )
}

// <div className="top-signin">
//     <Box
//         component="img"
//         sx={{
//             height: 60,
//             width: 60,
//         }}
//         alt="logo"
//         src={beaker}
//     />
//     <h2 className="sign-up">Sign Up</h2>
//     <FormControl>
//         <FormLabel id="demo-radio-buttons-group-label">
//             I am a
//         </FormLabel>
//         <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             defaultValue="female"
//             name="radio-buttons-group"
//         >
//             <FormControlLabel
//                 value="student"
//                 control={<Radio />}
//                 label="Student"
//             />
//             <FormControlLabel
//                 value="falculty/staff"
//                 control={<Radio />}
//                 label="Faculty/Staff"
//             />
//         </RadioGroup>
//     </FormControl>
//     {/* {JSON.stringify({ currentUser })} */}
//     {error && <Alert variant="danger">{error}</Alert>}
//     <form onSubmit={handleSubmit}>
//         <FormControl
//             type="email"
//             // inputRef={emailRef}
//         />
//         <div className="email-text-field">
//             <TextField
//                 type="text"
//                 className="email-address"
//                 placeholder="Email (example@lion.lmu.edu)"
//                 input={emailRef}
//                 // onChange={(event) => {
//                 //     setEmail(event.target.value)
//                 // }}
//                 required
//                 style={{
//                     width: '20em',
//                     marginBottom: '1em',
//                 }}
//             />
//         </div>
//         <FormControl
//             type="password"
//             // inputRef={passwordRef}
//         />
//         <div className="password-text-field">
//             <TextField
//                 type="password"
//                 className="password"
//                 placeholder="Password"
//                 inputRef={passwordRef}
//                 // onChange={(event) => {
//                 //     setPassword(event.target.value)
//                 // }}
//                 required
//                 style={{
//                     width: '20em',
//                     marginBottom: '1em',
//                 }}
//             />
//         </div>
//         <FormControl
//             type="password"
//             // ref={passwordConfirmRef}
//         />
//         <div className="confirm-password-text-field">
//             <TextField
//                 type="password"
//                 className="password-confirm"
//                 placeholder="Confirm Password"
//                 inputRef={passwordConfirmRef}
//                 required
//                 style={{
//                     width: '20em',
//                     marginBottom: '3em',
//                 }}
//             />
//         </div>
//         <div className="continue-to-profile-button">
//             {/* <Link to="/studentprofile"> */}
//             <Button
//                 disabled={loading}
//                 type="submit"
//                 className="continue-to-profile-btn"
//                 size="large"
//                 variant="contained"
//                 color="primary"
//                 // onClick={register}
//             >
//                 Continue to Profile
//             </Button>
//             {/* </Link> */}
//         </div>
//     </form>
// </div>

// <>
//     <Card>
//         <CardContent>
//             <h2 className="text-center mb-4">Sign Up</h2>
//             {JSON.stringify({ currentUser })}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <form onSubmit={handleSubmit}>
//                 <FormControl
//                     type="email"
//                     // inputRef={emailRef}
//                 />
//                 <TextField
//                     type="text"
//                     className="email-address"
//                     placeholder="example@lion.lmu.edu"
//                     inputRef={emailRef}
//                     required
//                 />
//                 <FormLabel>Password</FormLabel>
//                 <FormControl
//                     type="password"
//                     // inputRef={passwordRef}
//                 />
//                 <TextField
//                     type="text"
//                     className="password"
//                     placeholder="password"
//                     inputRef={passwordRef}
//                     required
//                 />

//                 <FormLabel>Password Confirmation</FormLabel>
//                 <FormControl
//                     type="password"
//                     // ref={passwordConfirmRef}
//                 />
//                 <TextField
//                     type="text"
//                     className="password-confirm"
//                     placeholder="confirm password"
//                     inputRef={passwordConfirmRef}
//                     required
//                 />

//                 {/* <div className="button1">
//                     <Link to="/studentprofile">
//                         Continue to Profile

//                 </div> */}

//                 <div className="button1">
//                     {/* <Link to="/studentprofile"> */}
//                     <Button
//                         disabled={loading}
//                         className="w-100"
//                         type="submit"
//                         className="btn1"
//                         size="medium"
//                         variant="outlined"
//                         color="secondary"
//                     >
//                         Continue to Profile
//                     </Button>
//                     {/* </Link> */}
//                 </div>
//             </form>
//         </CardContent>
//     </Card>
//         // </>
//     )
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signUp: (currentUser) => dispatch(signUp(currentUser)),
//     }
// }

export default NewUserStudent

// import React, { useEffect, useState } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { Link, useHistory } from 'react-router-dom'
// import { registerWithEmailAndPassword } from '../authActions'
// import { db, auth } from '../firebase'
// // import './Register.css'
// function NewUserStudent() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [name, setName] = useState('')
//     const [user, loading, error] = useAuthState(auth)
//     const history = useHistory()
//     const register = () => {
//         if (!name) alert('Please enter name')
//         registerWithEmailAndPassword(name, email, password)
//     }
//     // useEffect(() => {
//     //     if (loading) return
//     //     if (user) history.replace('/studentprofile')
//     // }, [user, loading])
//     return (
//         <div className="register">
//             <div className="register__container">
//                 <input
//                     type="text"
//                     className="register__textBox"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Full Name"
//                 />
//                 <input
//                     type="text"
//                     className="register__textBox"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="E-mail Address"
//                 />
//                 <input
//                     type="password"
//                     className="register__textBox"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                 />
//                 <button className="register__btn" onClick={register}>
//                     Register
//                 </button>
//                 {/* <button
//                     className="register__btn register__google"
//                     onClick={signInWithGoogle}
//                 >
//                     Register with Google
//                 </button> */}
//                 <div>
//                     Already have an account? <Link to="/">Login</Link> now.
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default NewUserStudent
