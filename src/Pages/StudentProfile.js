import React, { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import defaultImg from '../Images/profileImageBgRemove.png'
import { Link } from 'react-router-dom'
import DropdownYear from '../Components/dropdownYear'
import 'firebase/firestore'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import DropdownMajor from '../Components/dropdownMajor'
import DropdownMinor from '../Components/dropdownMinor'

const useStyles = makeStyles((theme) => ({
    yearDropdown: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    majorDropdown: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
    minorDropdown: {
        color: 'grey',
        textTransform: 'lowercase',
        fontSize: '18px',
        justifyContent: 'end',
    },
}))

function StudentProfile() {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState(1)
    const [lastName, setLastName] = useState(2)
    const [nickname, setNickname] = useState(3)
    const [major, setMajor] = useState(4)
    const [minor, setMinor] = useState(5)
    const [link, setPortfolioLink] = useState(6)
    const [resume, setResume] = useState(7)
    const [softskills, setSoftskills] = useState(8)
    const [summary, setSummary] = useState(9)
    const [year, setYear] = useState(10)
    const [pronouns, setPronouns] = useState(11)
    const [students, setStudents] = useState([])
    const studentsCollectionRef = useMemo(() => collection(db, 'students'), [])
    function handleClick() {
        console.log('Click happened')
    }

    const createStudent = async () => {
        await addDoc(studentsCollectionRef, {
            First: firstName,
            Middle: middleName,
            Last: lastName,
            Nickname: nickname,
            Year: year,
            Major: major,
            Minor: minor,
            PortfolioLink: link,
            Pronouns: pronouns,
            Resume: resume,
            Softskills: softskills,
            Summary: summary,
        })
    }

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(studentsCollectionRef)
            //loop through documents in collection
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
                    onChange={(event) => {
                        setMiddleName(event.target.value)
                    }}
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
                    onChange={(event) => {
                        setNickname(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="pronouns"
                    placeholder="Pronouns (Ex: she/her)"
                    onChange={(event) => {
                        setPronouns(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div>
                    <div>Year:</div>
                    <DropdownYear
                        className={classes.yearDropdown}
                        onClick={() => {
                            alert('clicked')
                        }}
                    ></DropdownYear>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>First Major:</div>
                    <DropdownMajor
                        className={classes.majorDropdown}
                    ></DropdownMajor>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>Second Major:</div>
                    <DropdownMajor
                        className={classes.majorDropdown}
                    ></DropdownMajor>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>First Minor:</div>
                    <DropdownMinor
                        className={classes.minorDropdown}
                    ></DropdownMinor>
                </div>
                <div></div>
                <br></br>
                <div>
                    <div>Second Minor:</div>
                    <DropdownMinor
                        className={classes.minorDropdown}
                    ></DropdownMinor>
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="skills"
                    placeholder="Soft Skills (separate by commas)"
                    onChange={(event) => {
                        setSoftskills(event.target.value)
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
                <input
                    type="text"
                    className="portfolio"
                    onChange={(event) => {
                        setPortfolioLink(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div className="done">
                    <Link className="button-link" to="/projectspage">
                        <Button
                            type="button"
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
