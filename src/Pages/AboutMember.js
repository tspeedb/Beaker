import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
//import Button from '@mui/material/Button'
import Layout from '../Components/Layout'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
//import { Icon } from '@mui/material'

function AboutMember({ match, members }) {
    const [member, setMember] = useState({})
    const [isShown, setIsShown] = useState(false)
    const [isShownT, setIsShownT] = useState(false)
    const [isShownB, setIsShownB] = useState(false)
    const id = match.params.memberId

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = members.filter((member) => member.key === id)[0]
        setMember(selected)
    }, [id, members])

    return (
        <Layout>
            <div style={{ margin: '20px' }}>
                <Link to="/allmembers">
                    <ArrowBackIosIcon></ArrowBackIosIcon>
                </Link>

                {member && (
                    <div className="about-container">
                        <div className="column-left">
                            <img
                                style={{
                                    width: 500,
                                    height: 750,
                                    clipPath: 'circle()',
                                    paddingTop: '0%',
                                }}
                                src={member.image}
                                alt="member.first"
                                // height="200"
                            />
                        </div>

                        <div className="column-right">
                            <div style={{ fontSize: '50px' }}>
                                {member.first} {member.last}
                            </div>
                            <div
                                style={{ fontSize: '25px', fontWeight: '200' }}
                            >
                                {member.major}{' '}
                            </div>
                            <div
                                style={{ fontSize: '25px', fontWeight: '200' }}
                            >
                                {member.minor}
                            </div>
                            <div style={{ fontSize: '15px', color: 'grey' }}>
                                {member.softskills}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {' '}
                                {member.bio}{' '}
                            </div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                paddingTop="50px"
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
                                        >
                                            {' '}
                                        </HighlightOffIcon>
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
                                        <BookmarkBorderIcon fontSize="large"></BookmarkBorderIcon>{' '}
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

export default AboutMember
