import React from 'react'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import defaultImg from '../Images/profileImageBgRemove.png'
import { Link } from 'react-router-dom'

function Profile() {
    return (
        <div className="new-profile">
            <div className="top-profile">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1>New User</h1>
                <p className="profile">Profile</p>
                <img className="default-image" src={defaultImg} alt="default" />
                <div></div>
                <input
                    type="text"
                    className="legal-name"
                    placeholder="Please enter your full legal name"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="preferred-name"
                    placeholder="Nickname/Preferred Name"
                />
                <div></div>
                <br></br>
                <input type="text" className="year" placeholder="Year" />
                <div></div>
                <br></br>
                <input type="text" className="major" placeholder="Major" />
            </div>
        </div>
    )
}

export default Profile
