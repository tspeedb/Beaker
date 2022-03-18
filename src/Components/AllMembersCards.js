import React, { useState } from 'react'
import CardItemAllMembers from './CardItemAllMembers'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import '../Styles/Projectspage.css'
const useStyles = makeStyles({
    gridContainer: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
    },
    image: {
        '&:hover': {
            background: 'black',
        },
    },
})

function AllMembersCards({ members }) {
    const classes = useStyles()

    return (
        //add a slider option using react-slick
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {members.map((member) => {
                    return (
                        <Grid item xs={8} sm={4} md={2} key={member.key}>
                            <Link to={`/aboutmember/${member.key}`}>
                                <CardItemAllMembers
                                    classname={classes.image}
                                    first={member.first}
                                    last={member.last}
                                    year={member.year}
                                    minor={member.minor}
                                    major={member.major}
                                    image={member.image}
                                    id={member.key}
                                />
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default AllMembersCards
