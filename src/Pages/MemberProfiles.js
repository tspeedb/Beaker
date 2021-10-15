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

function MemeberProfiles() {
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
                    Title of Project{' '}
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
                <Typography style={{ textAlign: 'justify' }}>
                    {' '}
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur{' '}
                </Typography>{' '}
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

export default MemeberProfiles
