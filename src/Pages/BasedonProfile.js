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

function BasedonProfile() {
    const classes = useStyles()

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        //fetch data from server

        const profile = projects.filter((project) => project.type === 'profile')

        setTimeout(() => {
            setProfiles(profile)
        }, 500)
    }, [])

    return (
        <Layout>
            <div>
                <Typography className={classes.mainTitle}>
                    {' '}
                    Based on your profile{' '}
                </Typography>
            </div>
            <div>
                <ProjectCards projects={profiles} />
            </div>
        </Layout>
    )
}

export default BasedonProfile
