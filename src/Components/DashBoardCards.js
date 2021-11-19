import CardItems from './CardItems'

import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import 'firebase/firestore'

import React, { useState, useEffect } from 'react'
import { ListItemButton, ListItemText, Grid } from '@mui/material'

const useStyles = makeStyles({
    largeCards: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
        height: '10rem',
        width: '20rem',
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
    },
    smallerCards: {
        margin: '10px',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
    gridContainer: {
        paddingLeft: '20rem',
    },
})

function DashboardCards() {
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
                <Grid item xs={12} sm={8} md={4}>
                    <Card className={classes.largeCards}> </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardCards
