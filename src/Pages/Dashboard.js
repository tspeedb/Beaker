import 'firebase/firestore'
import { db } from '../firebase'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Layout from '../Components/Layout'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@material-ui/styles'
import DashboardCards from '../Components/DashBoardCards'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Sidebar from '../Components/Sidebar'

const useStyles = makeStyles({
    smallerCards: {
        margin: '10px',
    },
    largeCards: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
        height: '15rem',
        width: '20rem',
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
        boxShadow: 'none',
        borderRadius: '12px',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
    gridContainer: {
        paddingLeft: '75px',
        paddingRight: '75px',
    },
    title: {
        fontSize: '50px',
        fontWeight: 'lighter',
    },
})

function Dashboard() {
    const classes = useStyles()
    // const [projects, setProjects] = useState([])
    // const projectsCollectionRef = collection(db, 'projects')
    // useEffect(() => {
    //     const getProjects = async () => {
    //         const data = await getDocs(projectsCollectionRef)
    //         //loop through documents in collection
    //         console.log(data)
    //         setProjects(
    //             data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    //         )
    //     }
    //     getProjects()
    // }, [])

    return (
        <Layout>
            <Sidebar>
                <div>
                    <h1 className={classes.title}> Dashboard </h1>
                    <Grid
                        container
                        justify="center"
                        className={classes.gridContainer}
                    >
                        <Grid item xs={12} sm={8} md={4}>
                            <h2>
                                {' '}
                                <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                                Bookemarked Projects{' '}
                            </h2>
                            <Card className={classes.largeCards}>
                                <Card className={classes.smallerCards}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            {' '}
                                            <Avatar>
                                                <BookmarkBorderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {' '}
                                            project bookmarked{' '}
                                        </ListItemText>
                                    </ListItemButton>{' '}
                                </Card>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={8} md={4}>
                            <h2>
                                {' '}
                                <FavoriteIcon />
                                Saved Projects{' '}
                            </h2>
                            <Card className={classes.largeCards}>
                                <Card className={classes.smallerCards}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            {' '}
                                            <Avatar>
                                                <FavoriteIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {' '}
                                            saved project{' '}
                                        </ListItemText>
                                    </ListItemButton>{' '}
                                </Card>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={8} md={4}>
                            <h2> My Projects </h2>
                            <Card className={classes.largeCards}>
                                <Card className={classes.smallerCards}>
                                    <ListItemButton>
                                        <ListItemText>
                                            {' '}
                                            my projects{' '}
                                        </ListItemText>
                                    </ListItemButton>{' '}
                                </Card>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <h2>
                                {' '}
                                <BookmarkBorderIcon />
                                Bookmarked members{' '}
                            </h2>
                            <Card className={classes.largeCards}>
                                <Card className={classes.smallerCards}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            {' '}
                                            <Avatar>
                                                <BookmarkBorderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {' '}
                                            member bookmarked{' '}
                                        </ListItemText>
                                    </ListItemButton>{' '}
                                </Card>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <h2>
                                {' '}
                                <FavoriteIcon />
                                Invited Members{' '}
                            </h2>
                            <Card className={classes.largeCards}>
                                <Card className={classes.smallerCards}>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            {' '}
                                            <Avatar>
                                                <FavoriteIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {' '}
                                            member bookmarked{' '}
                                        </ListItemText>
                                    </ListItemButton>{' '}
                                </Card>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* {projects.map((project) => {
                    return (
                        <div key={project.key}>
                            {' '}
                            <h1> {project.description} </h1>
                            <h1> {project.title} </h1>
                            <h1> {project.image} </h1>
                            <h1> {project.type} </h1>
                        </div>
                    )
                })} */}
                </div>
            </Sidebar>
        </Layout>
    )
}

export default Dashboard
