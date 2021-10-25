import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs, doc } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function Projectspage() {
    const classes = useStyles()
    // const [projects, setProjects] = useState([])
    const [browse, setBrowse] = useState([])
    const [profiles, setProfiles] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    // const projectCollection = firestore().collection('projects')
    // console.log('Project:' + projectCollection)

    // const fetchprojects = async (firebase) => {
    //     const projectsRef = firebase.collection('projects')
    //     const snapshot = await projectsRef.get()
    //     snapshot.forEach((doc) => {
    //         console.log(doc.id, '=>', doc.data())

    // const q = query(
    //     collection('projects'),
    //     where('projects', '==', true)
    // )

    // const querySnapshot = await getDocs(q)
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //         //     console.log(doc.id, ' => ', doc.data())
    //     })
    // }
    // const response = firebase.collection('projects')
    // const data = await response.get()
    // data.docs.forEach((item) => {
    //     setProjects([...projects, item.data()])

    useEffect(() => {
        //fetch data from server
        // fetchprojects();
        const projects1 = projects.filter(
            (project) => project.type === 'browsed'
        )
        const profile = projects.filter((project) => project.type === 'profile')
        const bookmarked = projects.filter(
            (project) => project.type === 'bookmarked'
        )
        setTimeout(() => {
            setBrowse(projects1)
            setProfiles(profile)
            setBookmarks(bookmarked)
        }, 500)
    }, [])

    // useEffect(() => {
    //     fetchprojects()
    // }, [])

    // return (
    //     <div>
    //         {projects &&
    //             projects.map((project) => {
    return (
        <Layout>
            <div>
                <Typography className={classes.mainTitle}>
                    {' '}
                    Projects{' '}
                </Typography>
            </div>
            <div>
                <Typography className={classes.title}>
                    Based on your profile <br></br>{' '}
                    <Link to="/basedonprofile"> See more </Link>
                </Typography>
                <ProjectCards projects={profiles} />
            </div>
            <div>
                <Typography className={classes.title}>
                    Browse projects <br></br>{' '}
                    <Link to="/browse"> See more </Link>
                </Typography>
                <ProjectCards projects={browse} />
            </div>
            <div>
                <Typography className={classes.title}>
                    Saved projects <br></br>{' '}
                    <Link to="/bookmarked"> See more </Link>
                </Typography>
                <ProjectCards projects={bookmarks} />
            </div>
        </Layout>
    )
    // })}
    //         </div>
    //     )
}

export default Projectspage
