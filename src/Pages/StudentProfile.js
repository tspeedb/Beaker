import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import defaultImg from '../Images/profileImageBgRemove.png'
import { Link } from 'react-router-dom'
import DropdownYear from '../Components/dropdownYear'
import { useState, useEffect } from 'react'
import 'firebase/firestore'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useScrollTrigger } from '@mui/material'
import DropdownMajor from '../Components/dropdownMajor'
import DropdownMinor from '../Components/dropdownMinor'

const useStyles = makeStyles((theme) => ({
    yearButtons: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    majorButtons: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    minorButtons: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
}))

function StudentProfile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState(0)
    const [bio, setBio] = useState(1)
    const [major, setMajor] = useState(2)
    const [minor, setMinor] = useState(3)
    const [link, setPortfolioLink] = useState(4)
    const [resume, setResume] = useState(5)
    const [softSkills, setSoftSkills] = useState(6)
    const [summary, setSummary] = useState(7)
    const [year, setYear] = useState(8)
    const [pronouns, setPronoun] = useState(9)
    const [students, setStudents] = useState([])
    const studentsCollectionRef = collection(db, 'students')

    const createStudent = async () => {
        await addDoc(studentsCollectionRef, {
            First: firstName,
            Last: lastName,
            Major: major,
            Minor: minor,
            PortfolioLink: link,
        })
    }

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentsCollectionRef)
            //loop through documents in collection
            console.log('here')
            console.log(data)
            setStudents(
                data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
            )
        }
        getStudents()
    }, [studentsCollectionRef])
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
                    className="first-name "
                    placeholder="First Name"
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
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
                    onChange={(event) => {
                        setLastName(event.target.value)
                    }}
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
                    placeholder="Pronouns (Ex: she/her)"
                />
                <div></div>
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
                <div>
                    <Button className={classes.majorButtons}>
                        <DropdownMajor
                            className={classes.majorButtons}
                        ></DropdownMajor>
                    </Button>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>Second Major:</div>
                    <Button className={classes.majorButtons}>
                        <DropdownMajor
                            className={classes.majorButtons}
                        ></DropdownMajor>
                    </Button>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>First Minor:</div>
                    <Button className={classes.minorButtons}>
                        <DropdownMinor
                            className={classes.minorButtons}
                        ></DropdownMinor>
                    </Button>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>Second Minor:</div>
                    <Button className={classes.minorButtons}>
                        <DropdownMinor
                            className={classes.minorButtons}
                        ></DropdownMinor>
                    </Button>
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="skills"
                    placeholder="Soft Skills (separate by commas)"
                    onChange={(event) => {
                        setSoftSkills(event.target.value)
                    }}
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
                <label className="portfolio">Link to Portfolio/Website</label>
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
                            onClick={createStudent}
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
