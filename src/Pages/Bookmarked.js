import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function Bookmarked() {
    const classes = useStyles()

    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        //fetch data from server

        const bookmarked = projects.filter(
            (project) => project.type === 'bookmarked'
        )

        setTimeout(() => {
            setBookmarks(bookmarked)
        }, 500)
    }, [])

    return (
        <Layout>
            <div>
                <Typography className={classes.mainTitle}>
                    {' '}
                    Saved Projects{' '}
                </Typography>
            </div>
            <div>
                <ProjectCards projects={bookmarks} />
            </div>
        </Layout>
    )
}

export default Bookmarked
