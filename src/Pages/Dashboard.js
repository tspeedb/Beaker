import 'firebase/firestore'
import React, { useState, useEffect, useMemo } from 'react'
import Layout from '../Components/Layout'
import Side from '../Components/Side'
import '../Styles/Sidebar.css'
import { useAuth } from '../Contexts/authContext'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

// SM: If you are not using this commented out code,
//     it would probably be best to get rid of it to keep the file cleaner
function Dashboard({ sidebaritems, members }) {
    const [isStudent, setIsStudent] = useState(true)
    const { signin, currentUser } = useAuth()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [name, setName] = useState('')

    const usersCollectionRef = useMemo(() => collection(db, 'allusers'), [])

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        let selected = data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
        setUsers(selected)
    }

    const getUser = (id) => {
        setUser(users.filter((x) => x.uid === id)[0])
    }

    useEffect(() => {
        getUsers()
        getUser(currentUser.uid)
        setName(user.firstName)
    }, [])

    return (
        <Layout>
            <Side sidebaritems={sidebaritems}>
            {users && (
                <div>
                    <h1
                        id="dash-title"
                        style={{
                            color: 'rgba(16, 127, 183, 1)',
                            textAlign: 'center',
                            fontSize: '50px',
                            fontWeight: 'lighter',
                            paddingTop: '20rem',
                        }}
                    >
                        {' '}
                        <b> {name} </b>, welcome
                        to your dashboard{' '}
                    </h1>
                </div>
            )}
            </Side>
        </Layout>
    )
}

export default Dashboard
