import React from 'react'
import CardItems from './CardItems'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
})

function ProjectCards(props) {
    const classes = useStyles()
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {props.projects.map((project, i) => {
                    return (
                        <Grid item xs={8} sm={8} md={4} key={i}>
                            <CardItems
                                title={project.title}
                                description={project.description}
                                image={project.image}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default ProjectCards
