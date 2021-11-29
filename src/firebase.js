// Initializes firebase db

import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDi1r-XknfPacf1vX0Pedbjn2YOdzut9xU',
    authDomain: 'lmubeaker-4ee65.firebaseapp.com',
    projectId: 'lmubeaker-4ee65',
    storageBucket: 'lmubeaker-4ee65.appspot.com',
    messagingSenderId: '1072322313306',
    appId: '1:1072322313306:web:43a5c26a04160f5d25ac63',
    measurementId: 'G-SLFQ048236',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const storage = firebase.storage()

export { storage, firebase, db }
