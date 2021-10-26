import React from 'react'
import CardItems from './CardItems'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
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

function ProjectCards(props) {
    const classes = useStyles()
    return (
        <div>
            <Grid container justify="center" className={classes.gridContainer}>
                {props.projects.map((project, i) => {
                    return (
                        <Grid item xs={8} sm={8} md={4} key={i}>
                            <Link
                                className={classes.links}
                                to={`/aboutproject/${i}`}
                            >
                                <CardItems
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
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
