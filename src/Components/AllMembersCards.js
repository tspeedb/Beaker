import React, { useState } from 'react'
import CardItemAllMembers from './CardItemAllMembers'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
const useStyles = makeStyles({
    gridContainer: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
    },
})

function AllMembersCards(props) {
    const classes = useStyles()
    const [show, setShow] = useState(false)
    const [hovered, setHovered] = useState(null)

    const handleMouseEnter = (e) => {
        setShow(true)
        setHovered(e.target.id)
    }
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {props.members.map((member, i) => {
                    return (
                        <Grid item xs={12} sm={8} md={4} key={i}>
                            <Link to={`/aboutmember/${i}`}>
                                <CardItemAllMembers
                                    name_year={member.name_year}
                                    bio={member.bio}
                                    image={member.image}
                                    id={i}
                                    handleMouseEnter={handleMouseEnter}
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
