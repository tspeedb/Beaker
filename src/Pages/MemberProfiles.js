import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
import projects from '../projectsdata'

import { makeStyles } from '@material-ui/styles'
import { width } from '@mui/system'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function MemberProfiles() {
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
                    Name of Student{' '}
                </Typography>
            </div>
            <div>
                {' '}
                <image> </image>
            </div>
            <div
                style={{
                    width: '50%',
                    float: 'right',
                    padding: '50px',
                }}
            >
                {' '}
                <Typography style={{ textAlign: 'justify' }}> </Typography>{' '}
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '45rem',
                    bottom: '30rem',
                }}
            >
                {' '}
                Save project, like project, message
            </div>
        </Layout>
    )
}

export default MemberProfiles
