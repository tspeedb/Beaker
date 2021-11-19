import 'firebase/firestore'
import { db } from '../firebase'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Layout from '../Components/Layout'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@material-ui/styles'
import DashboardCards from '../Components/DashBoardCards'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Side from '../Components/Side'

function Dashboard() {
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
            <Side>
                <div>
                    <h1 style={{ textAlign: 'center', fontSize: '40px' }}>
                        {' '}
                        Welcome to your dashboard{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default Dashboard
