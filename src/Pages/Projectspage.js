import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
// import projects from '../projectsdata'
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

function Projectspage({ projects }) {
    const classes = useStyles()
    const [browse, setBrowse] = useState([])
    const [profiles, setProfiles] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        //fetch data from server
        // fetchprojects();
        const browse = projects.filter((project) => project.type === 'browse')
        const profile = projects.filter((project) => project.type === 'profile')
        const bookmarked = projects.filter(
            (project) => project.type === 'bookmarked'
        )

        setBrowse(browse)
        setProfiles(profile)
        setBookmarks(bookmarked)
    }, [projects])

    return (
        <Layout>
            <div>
                <Typography id="Title"> Projects </Typography>
            </div>
            <div>
                <Typography className={classes.title}>
                    Based on your profile <br></br>{' '}
                    <Link
                        style={{
                            color: 'rgba(16, 127, 183, 1)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontStyle: 'italic',
                        }}
                        to="/basedonprofile"
                    >
                        {' '}
                        See more{' '}
                    </Link>
                </Typography>
                <ProjectCards projects={profiles} />
            </div>
            <div>
                <Typography className={classes.title}>
                    Browse projects <br></br>{' '}
                    <Link
                        style={{
                            color: 'rgba(16, 127, 183, 1)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontStyle: 'italic',
                        }}
                        to="/browse"
                    >
                        {' '}
                        See more{' '}
                    </Link>
                </Typography>
                <ProjectCards projects={browse} />
            </div>
        </Layout>
    )
}

export default Projectspage
