import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import defaultImg from '../Images/profileImageBgRemove.png'
import { Link } from 'react-router-dom'
import DropdownYear from '../Components/dropdownYear'

const useStyles = makeStyles((theme) => ({
    yearButtons: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
}))

function StudentProfile() {
    const classes = useStyles()
    return (
        <div className="new-profile">
            <div className="left-screen">
                <h1 className="text-info">
                    Create <br></br> Your <br></br> Profile
                </h1>
            </div>
            <div className="right-screen">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1>New User</h1>
                <p className="profile">Profile</p>
                <img className="default-image" src={defaultImg} alt="default" />
                <div></div>
                <input
                    type="text"
                    className="first-name"
                    placeholder="First Name"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="middle-name"
                    placeholder="Middle Name"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="last-name"
                    placeholder="Last Name"
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
                <input
                    type="text"
                    className="pronouns"
                    placeholder="Pronouns"
                />
                <br></br>
                <div>
                    <Button className={classes.yearButtons}>
                        <DropdownYear
                            className={classes.yearButtons}
                        ></DropdownYear>
                    </Button>
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="major"
                    placeholder="Major(s) (separate by commas)"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="minor"
                    placeholder="Minor(s) (separate by commas)"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="skills"
                    placeholder="Soft Skills (separate by commas)"
                />
                <div></div>
                <br></br>
                <label className="self-intro">
                    Tell us a little about yourself:
                </label>
                <div></div>
                <textarea></textarea>
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

export default StudentProfile
