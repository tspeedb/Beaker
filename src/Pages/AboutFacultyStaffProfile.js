import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'

function AboutFacultyStaffProfile({ match, fsMembers }) {
    const [fsMember, setFSMember] = useState({})
    const id = match.params.memberId

    useEffect(() => {
        //send the network request to retrieve data for this faculty/staff member
        const selected = fsMembers.filter((fsMember) => fsMember.key === id)[0]
        setFSMember(selected)
    }, [id, fsMembers])

    return (
        <Layout>
            <div style={{ margin: '20px' }}>
                <Link to="/dashboard">
                    <ArrowBackIosIcon></ArrowBackIosIcon>
                </Link>

                {fsMember && (
                    <div className="about-container">
                        <div className="column-left">
                            <img
                                style={{
                                    width: 500,
                                    height: 750,
                                    clipPath: 'circle()',
                                    paddingTop: '0%',
                                }}
                                src={fsMember.facultyImage}
                                alt="student.first"
                                // height="200"
                            />
                        </div>

                        <div className="column-right">
                            <div style={{ fontSize: '50px' }}>
                                {fsMember.title} {fsMember.facultyFirst}{' '}
                                {fsMember.facultyMiddle} {fsMember.facultyLast}
                            </div>
                            <div style={{ fontSize: '50px' }}>
                                {fsMember.facultyNickname}{' '}
                                {fsMember.facultyPronouns}
                            </div>
                            <div
                                style={{ fontSize: '25px', fontWeight: '200' }}
                            >
                                {fsMember.department}{' '}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {' '}
                                {fsMember.labDesc}{' '}
                            </div>
                            <div
                                style={{ fontSize: '15px', maxWidth: '600px' }}
                            >
                                {' '}
                                {fsMember.facultyPortfolioLink}{' '}
                            </div>
                        </div>
                    </div>
                )}
                <Link to="/editfacultystaffprofile">
                    <EditIcon></EditIcon>
                </Link>
            </div>
        </Layout>
    )
}

export default AboutFacultyStaffProfile
