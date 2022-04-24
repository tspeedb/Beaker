import { StayCurrentLandscape } from '@mui/icons-material'
import 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import Side from '../Components/Side'
import '../Styles/Sidebar.css'
import { useAuth } from '../Contexts/authContext'

// SM: If you are not using this commented out code,
//     it would probably be best to get rid of it to keep the file cleaner
function Dashboard({ sidebaritems, members }) {
    const [isStudent, setIsStudent] = useState(true)
    const { signin, currentUser } = useAuth()
    // const [projects, setProjects] = useState([])
    // const projectsCollectionRef = collection(db, 'projects')
    // useEffect(() => {
    //     const getProjects = async () => {
    //         const data = await getDocs(projectsCollectionRef)
    //         //loop through documents in collection
    //         console.log(data)
    //         setProjects(
    //             data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    //         )
    //     }
    //     getProjects()
    // }, [])

    return (
        <Layout>
            <Side sidebaritems={sidebaritems}>
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
                        <b> {currentUser.email} </b>, welcome to your dashboard{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default Dashboard
