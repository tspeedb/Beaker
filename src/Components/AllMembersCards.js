import React from 'react'
import CardItemAllMembers from './CardItemAllMembers'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
    gridContainer: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
    },
})

function AllMembersCards(props) {
    const classes = useStyles()
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {props.members.map((member, i) => {
                    return (
                        <Grid item xs={12} sm={8} md={4} key={i}>
                            <CardItemAllMembers
                                name_year={member.name_year}
                                bio={member.bio}
                                image={member.image}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default AllMembersCards
