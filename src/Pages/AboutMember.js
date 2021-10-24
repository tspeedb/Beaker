import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
//import Button from '@mui/material/Button'
import members from '../membersdata'
import Layout from '../Components/Layout'
//import { Icon } from '@mui/material'

function AboutMember({ match }) {
    const [member, setMember] = useState({})
    const id = Number(match.params.memberId)

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = members.filter((member, i) => i === id)[0]
        setMember(selected)
    }, [id])

    return (
        <Layout>
            <div>
                <Link to="/allmembers">
                    <ArrowBackIosIcon></ArrowBackIosIcon>
                </Link>
                <div className="about-container">
                    <div className="column-left"> {member.image}</div>
                    <div className="column-right">
                        <div style={{ fontSize: '50px' }}>
                            {member.name_year}
                        </div>
                        <div style={{ fontSize: '25px', fontWeight: '200' }}>
                            {member.major}
                        </div>
                        <div style={{ fontSize: '25px', fontWeight: '200' }}>
                            {member.minor}
                        </div>
                        <div style={{ fontSize: '15px', color: 'grey' }}>
                            {member.softskills}
                        </div>
                        <div style={{ fontSize: '15px', maxWidth: '600px' }}>
                            {member.bio}
                        </div>
                    </div>
                </div>

                <div className="action-items">
                    <HighlightOffIcon></HighlightOffIcon>
                    <FavoriteIcon> </FavoriteIcon>
                    <BookmarkBorderIcon></BookmarkBorderIcon>
                </div>
            </div>
        </Layout>
    )
}

export default AboutMember
