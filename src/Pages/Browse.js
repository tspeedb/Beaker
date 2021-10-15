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

function Browse() {
    const classes = useStyles()
    const [browse, setBrowse] = useState([])

    useEffect(() => {
        //fetch data from server
        const projects1 = projects.filter(
            (project) => project.type === 'browsed'
        )

        setTimeout(() => {
            setBrowse(projects1)
        }, 500)
    }, [])

    return (
        <Layout>
            <div>
                <Typography className={classes.mainTitle}> Browse </Typography>
            </div>
            <div>
                <ProjectCards projects={browse} />
            </div>
        </Layout>
    )
}

export default Browse
