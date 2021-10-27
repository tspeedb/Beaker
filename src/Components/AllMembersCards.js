import React, { useState } from 'react'
import CardItemAllMembers from './CardItemAllMembers'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
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

function AllMembersCards(props) {
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
                {props.members.map((member, i) => {
                    return (
                        <Grid item xs={8} sm={4} md={2} key={i}>
                            <Link to={`/aboutmember/${i}`}>
                                <CardItemAllMembers
                                    classname="image"
                                    name_year={member.name_year}
                                    bio={member.bio}
                                    image={member.image}
                                    id={i}
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
