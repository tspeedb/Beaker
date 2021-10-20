import React from 'react'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import defaultImg from '../Images/profileImageBgRemove.png'
import { Link } from 'react-router-dom'

function FacultyStaffProfile() {
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
                    placeholder="Please enter your full name"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="preferred-name"
                    placeholder="Preferred way to be addressed"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="pronouns"
                    placeholder="Pronouns"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="department"
                    placeholder="Department"
                />
                <div></div>
                <br></br>
                <label className="resume">Upload CV or Resume</label>
                <div></div>
                <br></br>
                {/* allow users to upload pdf of resume here */}
                <div></div>
                <br></br>
                <label className="resume">Link to Portfolio</label>
                <div></div>
                <br></br>
                <input type="text" className="portfolio" />
                <div></div>
                <br></br>
                <div className="done">
                    <Link className="button-link" to="/projectspage">
                        <Button
                            className="done-btn1"
                            size="large"
                            color="primary"
                        >
                            Done
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FacultyStaffProfile
