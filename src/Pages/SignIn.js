import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'
import 'firebase/compat/storage'
import 'firebase/auth'
import { auth } from '../firebase'
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import UserProfile from './UserProfile'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    // const register = async () => {
    //     try {
    //         const user = await createUserWithEmailAndPasword()
    //         console.log(user)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    // const logout = async () => {await signOut(Auth);}

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
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div className="button1"></div>
                <Button
                    className="btn1"
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={login}
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
