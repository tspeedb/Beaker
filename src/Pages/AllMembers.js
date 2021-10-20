import React, { useState, useEffect } from 'react'
import AllMembersCards from '../Components/AllMembersCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function AllMembers() {
    const classes = useStyles()
    // const [browse, setBrowse] = useState([])
    // const [profiles, setProfiles] = useState([])
    // const [bookmarks, setBookmarks] = useState([])

    // useEffect(() => {
    //     //fetch data from server
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
                <Typography className={classes.mainTitle}>
                    {' '}
                    Seeking Members{' '}
                </Typography>
            </div>
            <div>
                <AllMembersCards />
            </div>
            <div></div>
            <div></div>
        </Layout>
    )
}

export default AllMembers
