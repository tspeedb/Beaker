import React from 'react'

// import '../Styles/Homepage.html'
import ProjectCards from '../Components/ProjectCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'

function Projectspage() {
    return (
        <Layout>
            <div>
                <Typography>Based on your profile</Typography>
                <ProjectCards></ProjectCards>
            </div>
            <div>
                <Typography>Browse projects</Typography>
                <ProjectCards></ProjectCards>
            </div>
            <div>
                <Typography>Saved projects</Typography>
                <ProjectCards></ProjectCards>
            </div>
        </Layout>
    )
}

export default Projectspage
