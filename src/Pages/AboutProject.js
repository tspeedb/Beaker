import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import TelegramIcon from '@mui/icons-material/Telegram'
//import Button from '@mui/material/Button'

import Layout from '../Components/Layout'
import { IconButton } from '@mui/material'
//import { Icon } from '@mui/material'

function AboutProject({ match, projects }) {
    const [project, setProject] = useState({})
    const [isShown, setIsShown] = useState(false)
    const [isShownT, setIsShownT] = useState(false)
    const [isShownB, setIsShownB] = useState(false)
    const id = match.params.projectId

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = projects.filter((project) => project.key === id)[0]
        setProject(selected)
    }, [id, projects])

    return (
        <Layout>
            <div>
                <div style={{ margin: '20px' }}>
                    <Link to="/projectspage">
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </Link>
                </div>
                {project && (
                    <div className="about-container">
                        <div className="column-left">
                            {' '}
                            <img
                                src={project.image}
                                alt="project.title"
                                style={{
                                    width: 500,
                                    height: 500,
                                    paddingBottom: '20px',
                                    paddingTop: '0%',
                                }}
                            />{' '}
                        </div>
                        <div className="column-right">
                            <div style={{ fontSize: '50px' }}>
                                {project.title}
                            </div>
                            <div style={{ fontSize: '20px' }}>Created by:</div>

                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {project.description}
                            </div>
                            <br></br>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                <strong> Desired Major(s): </strong>{' '}
                                {project.major}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {project.softskills}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                <strong> Project Timeline: </strong>{' '}
                                {project.timeline}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {project.incentives}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                <strong> Desired Year(s):</strong>{' '}
                                {project.year}
                            </div>

                            <Grid
                                className="action-items"
                                direction="row"
                                justifyContent="space-evenly"
                            >
                                <div>
                                    <IconButton
                                        onMouseEnter={() => setIsShown(true)}
                                        onMouseLeave={() => setIsShown(false)}
                                    >
                                        <HighlightOffIcon
                                            fontSize="large"
                                            style={{
                                                color: 'rgba(16, 127, 183, 1)',
                                            }}
                                        ></HighlightOffIcon>
                                        {isShown && (
                                            <div
                                                style={{
                                                    fontSize: '10px',
                                                    alignContent: 'center',
                                                }}
                                            >
                                                Not a fit
                                            </div>
                                        )}
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton
                                        onMouseEnter={() => setIsShownT(true)}
                                        onMouseLeave={() => setIsShownT(false)}
                                    >
                                        <TelegramIcon
                                            fontSize="large"
                                            style={{
                                                color: 'rgba(172, 12, 48, 1)',
                                            }}
                                        >
                                            {' '}
                                        </TelegramIcon>
                                        {isShownT && (
                                            <div style={{ fontSize: '10px' }}>
                                                Invite to join
                                            </div>
                                        )}
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton
                                        onMouseEnter={() => setIsShownB(true)}
                                        onMouseLeave={() => setIsShownB(false)}
                                    >
                                        <BookmarkBorderIcon fontSize="large"></BookmarkBorderIcon>
                                        {isShownB && (
                                            <div style={{ fontSize: '10px' }}>
                                                Bookmark
                                            </div>
                                        )}
                                    </IconButton>
                                </div>
                            </Grid>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default AboutProject
