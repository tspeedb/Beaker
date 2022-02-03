import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import 'firebase/compat/auth'
import { getAuth } from 'firebase/auth'

function NewUserStudent() {
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loginEmail, set] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPasword()
            console.log(user)
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
                        setRegisterEmail(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value)
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
