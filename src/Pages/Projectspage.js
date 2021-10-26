import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import '../Styles/Projectspage.css'
// import { collection, query, where, getDocs, doc } from 'firebase/firestore'

import 'firebase/firestore'
import { keyframes } from '@mui/styled-engine'
// import firebase from '../firebase'

const useStyles = makeStyles({
    title: { textAlign: 'left' },

    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function Projectspage() {
    const classes = useStyles()
    // const [projects, setProjects] = useState([])
    // const [browse, setBrowse] = useState([])
    // const [profiles, setProfiles] = useState([])
    // const [bookmarks, setBookmarks] = useState([])

    // useEffect(() => {
    //     //fetch data from server
    //     // fetchprojects();
    //     const projects1 = projects.filter(
    //         (project) => project.type === 'browsed'
    //     )
    //     const profile = projects.filter((project) => project.type === 'profile')
    //     const bookmarked = projects.filter(
    //         (project) => project.type === 'bookmarked'
    //     )
    //     setTimeout(() => {
    //         setBrowse(projects1)
    //         setProfiles(profile)
    //         setBookmarks(bookmarked)
    //     }, 500)
    // }, [])

    return (
        <Layout>
            <div>
                <Typography id="Title"> Projects </Typography>
            </div>
            <div>
                <Typography className={classes.title}>
                    Based on your profile <br></br>{' '}
                    <Link to="/basedonprofile"> See more </Link>
                </Typography>
                <ProjectCards />
            </div>
            <div>
                <Typography className={classes.title}>
                    Browse projects <br></br>{' '}
                    <Link to="/browse"> See more </Link>
                </Typography>
                <ProjectCards />
            </div>
            <div>
                <Typography className={classes.title}>
                    Saved projects <br></br>{' '}
                    <Link to="/bookmarked"> See more </Link>
                </Typography>
                {/* <ProjectCards projects={bookmarks} /> */}
                <ProjectCards />
            </div>
        </Layout>
    )
}

export default Projectspage
