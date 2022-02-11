// import React from 'react'
import CardItems from './CardItems'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import 'firebase/firestore'

import React, { useState, useEffect } from 'react'

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
})

function ProjectCards({ projects }) {
    const classes = useStyles()
    // const [projects, setProjects] = useState([])
    // const projectsCollectionRef = collection(db, 'projects')
    // useEffect(() => {
    //     const getProjects = async () => {
    //         const data = await getDocs(projectsCollectionRef)
    //         //loop through documents in collection
    //         console.log(data)
    //         console.log('pasta')
    //         setProjects(s
    //             data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    //         )
    //     }
    //     getProjects()
    // }, [])
    return (
        <div>
            <Grid container justify="center" className={classes.gridContainer}>
                {projects.map((project) => {
                    /* {props.projects.map((project, i) => { */

                    return (
                        <Grid item xs={8} sm={8} md={4} key={project.key}>
                            <Link
                                className={classes.links}
                                to={`/aboutproject/${project.key}`}
                            >
                                <CardItems
                                    project={project}
                                    // key={project.key}
                                />
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default ProjectCards
