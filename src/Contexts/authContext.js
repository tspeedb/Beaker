import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {})
            .catch((e) => {
                if (e.code === 'auth/email-already-in-use') {
                    console.log('Email already in Use')
                    alert('Email already in Use')
                }
                if (e.code === 'auth/weak-password')
                    console.log(
                        'Password must be at least 7 characters long and contain special characters'
                    )
                alert(
                    'Password must be at least 7 characters long and contain special characters'
                )
            })
    }
    function signin(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {})
            .catch((e) => {
                if (e.code === 'auth/user-not-found') {
                    console.log(
                        'This email was not found, please enter a valid email'
                    )
                    alert(
                        'This email was not found, please enter a valid email'
                    )
                }
                if (e.code === 'auth/wrong-password') {
                    console.log('Invalid Password, Please try again')
                    alert('Invalid Password, Please try again')
                }
            })
    }
    function signout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signin,
        signout,
        signup,
        resetPassword,
        updateEmail,
        updatePassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
