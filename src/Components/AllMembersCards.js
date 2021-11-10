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
    const [show, setShow] = useState(false)
    const [hovered, setHovered] = useState(null)

    const handleMouseEnter = (e) => {
        setShow(true)
        setHovered(e.target.id)
        console.log(handleMouseEnter)
    }
    const handleMouseLeave = (e) => {
        setShow(false)
        setHovered(e.target.id)
        console.log(handleMouseLeave)
    }
    return (
        <div>
            <Grid container justify="center" classname={classes.gridContainer}>
                {members.map((member) => {
                    return (
                        <Grid item xs={8} sm={4} md={2} key={member.key}>
                            <Link to={`/aboutmember/${member.key}`}>
                                <CardItemAllMembers
                                    classname="image"
                                    first={member.first}
                                    year={member.year}
                                    bio={member.Bio}
                                    image={member.Image}
                                    // id={member.key}
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseLeave={handleMouseLeave}
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
