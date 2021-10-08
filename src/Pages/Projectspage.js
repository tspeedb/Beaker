import React, { useState, useEffect } from 'react'

// import '../Styles/Homepage.html'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function Projectspage() {
    const classes = useStyles()
    const [browse, setBrowse] = useState([])
    const [profiles, setProfiles] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        //fetch data from server
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
                    Based on your profile <br></br> See more
                </Typography>
                <ProjectCards projects={profiles} />
            </div>
            <div>
                <Typography className={classes.title}>
                    Browse projects <br></br> See more
                </Typography>
                <ProjectCards projects={browse} />
            </div>
            <div>
                <Typography className={classes.title}>
                    Saved projects <br></br> See more
                </Typography>
                <ProjectCards projects={bookmarks} />
            </div>
        </Layout>
    )
}

export default Projectspage
