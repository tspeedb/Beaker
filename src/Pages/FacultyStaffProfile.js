import React, { useState, useEffect, useMemo } from 'react'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'

function FacultyStaffProfile() {
    const [title, setTitle] = useState('')

    const handleSelect = (e) => {
        console.log(e)
        setTitle(e)
    }

    return (
        <div className="new-profile">
            <div className="left-screen-fs">
                <h1 className="left-text-info" id="left-text">
                    Create <br></br> Your <br></br> Profile
                </h1>
            </div>
            <div className="right-screen">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1 className="new-user">New User</h1>
                <p className="profile">Profile</p>
                {/* <Profileimage></Profileimage> */}
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="title"
                    placeholder="Title (Ex: Professor)"
                />
                <div></div>
                <br></br>
                <input
                    //it would probably be best to get rid of any commented out code to keep the code more clean (MS)
                    type="text"
                    className="first-name"
                    placeholder="First Name(s)"
                    // onChange={(event) => {
                    //     setFirstName(event.target.value)
                    // }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="middle-name"
                    placeholder="Middle Name(s)"
                    // onChange={(event) => {
                    //     setMiddleName(event.target.value)
                    // }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="last-name"
                    placeholder="Last Name(s)"
                    // onChange={(event) => {
                    //     setLastName(event.target.value)
                    // }}
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
                    placeholder="Pronouns (Ex: she/her)"
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
                <label>Lab Description:</label>
                <br></br>
                <textarea className="lab-description" />
                <div></div>
                <br></br>
                <label className="resume">Link to Portfolio/Website</label>
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
