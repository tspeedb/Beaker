export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signInWithEmailAndPassword(
                credentials.emailRef,
                credentials.passwordRef
            )
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGIN_ERROR', err })
            })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firbase = getFirebase()
        const firestore = getFirestore
    }
}
