import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'
import 'firebase/compat/storage'
import 'firebase/auth'
import { auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

function NewUserStudent() {
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [loginEmail, set] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                newUserEmail,
                newUserPassword
            )
        } catch (error) {
            console.log(error.message)
        }
    }
    const login = async () => {}

    const logout = async () => {}

    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <h1>New User</h1>
                <p className="signin">Login Information</p>
                <div></div>
                <input
                    type="text"
                    className="email-address"
                    placeholder="example@lion.lmu.edu"
                    onChange={(event) => {
                        setNewUserEmail(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                    onChange={(event) => {
                        setNewUserPassword(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div className="button1">
                    <Link className="button-link" to="/studentprofile">
                        <Button
                            className="btn1"
                            size="medium"
                            variant="outlined"
                            color="secondary"
                            onClick={register}
                        >
                            Continue to Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewUserStudent
