import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
//import Button from '@mui/material/Button'
import Layout from '../Components/Layout'
//import { Icon } from '@mui/material'

function AboutMember({ match, members }) {
    const [member, setMember] = useState({})
    const id = match.params.memberId

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = members.filter((member) => member.key === id)[0]
        setMember(selected)
    }, [id, members])

    return (
        <Layout>
            <div>
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
                                src={`${process.env.PUBLIC_URL}/projectImages/${member.Image}`}
                                alt="member.first"
                                // height="200"
                            />
                        </div>

                        <div className="column-right">
                            <div style={{ fontSize: '50px' }}>
                                {member.First} {member.Last}
                            </div>
                            <div
                                style={{ fontSize: '25px', fontWeight: '200' }}
                            >
                                {member.Major}{' '}
                            </div>
                            <div
                                style={{ fontSize: '25px', fontWeight: '200' }}
                            >
                                {member.Minor}
                            </div>
                            <div style={{ fontSize: '15px', color: 'grey' }}>
                                {member.SoftSkills}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {' '}
                                {member.Bio}{' '}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <HighlightOffIcon
                style={{
                    color: 'rgba(16, 127, 183, 1)',
                    // transform: 'scale(1.8)',
                    horizontalAlign: 'middle',
                    transform: 'scale(1.8)',
                    marginLeft: '20rem',
                    marginRight: '35px',
                    display: 'inline-flex',
                }}
            ></HighlightOffIcon>
            <FavoriteIcon
                style={{
                    color: 'rgba(172, 12, 48, 1)',
                    transform: 'scale(1.8)',

                    marginRight: '35px',
                }}
            >
                {' '}
            </FavoriteIcon>
            <BookmarkBorderIcon
                style={{
                    transform: 'scale(1.8)',
                }}
            ></BookmarkBorderIcon>{' '}
        </Layout>
    )
}

export default AboutMember
