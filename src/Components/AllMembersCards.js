import React from 'react'
import CardItemAllMembers from './CardItemAllMembers'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
})

function AllMembersCards(props) {
    const classes = useStyles()
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {props.members.map((member, i) => {
                    return (
                        <Grid item xs={8} sm={8} md={4} key={i}>
                            <CardItemAllMembers
                                title={member.name_year}
                                description={member.description}
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
