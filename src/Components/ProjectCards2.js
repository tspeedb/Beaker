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

function ProjectCards2() {
    const classes = useStyles()
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                <Grid item xs={8} sm={8} md={4}>
                    <CardItems
                        title="Project 4"
                        /* path="/onthebloc"*/
                        description="A React website built with three other classmates called On The Block. Users would plan block parties by choosing from different local small business’s to cater, entertain..etc at their parties."
                        href="https://ontheblock.vercel.app/"
                    />
                </Grid>
                <Grid item xs={8} sm={8} md={4}>
                    <CardItems
                        title="Project 5"
                        description="An app built with two other members of the CSSI program, implementing HTML, Python, JavaScript, and CSS. This app allowed college students to have easy access to their peers social calendars to make planning social outing events easier.
              "
                    />
                </Grid>
                <Grid item xs={8} sm={8} md={4}>
                    <CardItems
                        title="Project 6"
                        description="An app built with two other members of the CSSI program, implementing HTML, Python, JavaScript, and CSS. This app allowed college students to have easy access to their peers social calendars to make planning social outing events easier.
              "
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProjectCards2
