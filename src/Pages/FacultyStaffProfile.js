import React, { useState, useEffect, useMemo, useRef } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

function FacultyStaffProfile({ setFSMembers }) {
    const [title, setTitle] = useState('')
    const [facultyFirstName, setFacultyFirstName] = useState('')
    const [facultyMiddleName, setFacultyMiddleName] = useState('')
    const [facultyLastName, setFacultyLastName] = useState('')
    const [facultyNickname, setFacultyNickname] = useState('')
    const [facultyPronouns, setFacultyPronouns] = useState('')
    const [department, setDepartment] = useState('')
    const [labDesc, setLabDesc] = useState('')
    const [facultyLink, setFacultyPortfolioLink] = useState(6)
    const [url, setURL] = useState('')
    const [facultyImageAsFile, setFacultyImageAsFile] = useState(null)
    const [facultyImageAsUrl, setFacultyImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value)
    }

    const handleSelect = (e) => {
        console.log(e)
        setTitle(e)
    }

    console.log(facultyImageAsFile)
    const handleImageAsFile = (e) => {
        setFacultyImageAsFile(e.target.files[0])
    }

    function handleUpload(e) {
        e.preventDefault()
        const ref = storage.ref(`/Images/${facultyImageAsFile.name}`)
        const uploadTask = ref.put(facultyImageAsFile)
        uploadTask.on('state_changed', console.log, console.error, () => {
            ref.getDownloadURL().then((url) => {
                setFacultyImageAsFile(null)
                setFacultyImageAsUrl(url)
            })
        })
    }

    const facultystaffCollectionRef = useMemo(
        () => collection(db, 'facultystaff'),
        []
    )
    const getFacultyStaff = async () => {
        const data = await getDocs(facultystaffCollectionRef)
        //loop through documents in collection
        setFSMembers(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }
    const createFacultyStaff = async () => {
        await addDoc(facultystaffCollectionRef, {
            title: title,
            facultyFirst: facultyFirstName,
            facultyMiddle: facultyMiddleName,
            facultyLast: facultyLastName,
            facultyNickname: facultyNickname,
            facultyPronouns: facultyPronouns,
            department: department,
            labDesc: labDesc,
            facultyPortfolioLink: facultyLink,
            facultyImage: facultyImageAsUrl,
        })

        getFacultyStaff()
    }

    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        },

        (error, result) => {
            console.log('result:', result)
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info)
                setFacultyImageAsUrl(result.info.url)
            }
        }
    )

    const openWidget = (e, widget) => {
        e.preventDefault()
        widget.open()
    }

    const departmentOptions = [
        'Accounting (ACCT)',
        'African American Studies (AFAM)',
        'Animation (ANIM)',
        'Applied Mathematics',
        'Applied Physics',
        'Art History (ARHS)',
        'Asian and Pacific Studies (ASPA)',
        'Biochemistry',
        'Bioethics (BIOE)',
        'Biology (BIOL)',
        'Business Administration (BADM)',
        'Chemistry (CHEM)',
        'Chicana/o and Latina/o Studies (CLST)',
        'Civil Engineering (CIVL)',
        'Classics and Archaeology (CLAR)',
        'Communication Studies (CMST)',
        'Computer Science (CMSI)',
        'Dance (DANC)',
        'Economics (ECON)',
        'Electrical Engineering (EECE)',
        'English (ENGL)',
        'Entrepreneurship (ENTR)',
        'Environmental Science (ENVS)',
        'Environmental Studies (EVST)',
        'Film and Television Production (PROD)',
        'Film, Television, and Media Studies (FTVS)',
        'Finance (FNCE)',
        'French (FREN)',
        'Health and Human Sciences (HHSC)',
        'History (HIST)',
        'Humanities (HMNT)',
        'Information Systems and Business Analytics (ISBA)',
        'International Relations',
        'Journalism (JOUR)',
        'Liberal Studies (LBST)',
        'Management and Leadership (MGMT)',
        'Marketing (MRKT)',
        'Mathematics (MATH)',
        'Mechanical Engineering (MECH)',
        'Modern Languages (MDLG)',
        'Music (MUSC)',
        'Philosophy (PHIL)',
        'Physics (PHYS)',
        'Political Science (POLS)',
        'Psychology (PSYC)',
        'Recording Arts (RECA)',
        'Screenwriting (SCWR)',
        'Sociology (SOCL)',
        'Spanish (SPAN)',
        'Statistics and Data Science',
        'Studio Arts (ART)',
        'Theatre Arts (THEA)',
        'Theological Studies (THST)',
        'Urban Studies (URBN)',
        'Womens and Gender Studies (WGST)',
    ]

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
                <div>
                    <img
                        style={{
                            width: 250,
                            height: 250,
                            clipPath: 'circle()',

                            paddingTop: 0,
                        }}
                        alt="profile"
                        src={facultyImageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <FormControl />
                <div className="fs-title">
                    <TextField
                        type="text"
                        label="Title (Ex: Professor)"
                        placeholder="Title (Ex: Professor)"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-first-name">
                    <TextField
                        type="text"
                        label="First Name(s)"
                        placeholder="First Name(s)"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyFirstName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-middle-name">
                    <TextField
                        type="text"
                        label="Middle Name(s)"
                        placeholder="Middle Name(s)"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyMiddleName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-last-name">
                    <TextField
                        type="text"
                        label="Last Name(s)"
                        placeholder="Last Name(s)"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyLastName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-preferred-name">
                    <TextField
                        type="text"
                        label="Preferred way to be addressed"
                        placeholder="Preferred way to be addressed"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyNickname(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-pronouns">
                    <TextField
                        type="text"
                        label="Pronouns (Ex: she/her)"
                        placeholder="Pronouns (Ex: she/her)"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyPronouns(event.target.value)
                        }}
                    />
                </div>
                <div className="department-options">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Department</InputLabel>
                        <Select
                            value={department}
                            onChange={handleChangeDepartment}
                        >
                            {departmentOptions.map((departmentOption) => (
                                <MenuItem
                                    key={departmentOption}
                                    value={departmentOption}
                                >
                                    {departmentOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <FormControl />
                <div className="lab-description">
                    <TextField
                        multiline
                        rows={6}
                        label="Lab Description"
                        placeholder="Lab Description"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setLabDesc(event.target.value)
                        }}
                    />
                </div>
                {/* <label className="resume">Upload CV or Resume</label> */}
                <FormControl />
                <div className="fs-portfolio">
                    <TextField
                        type="text"
                        label="Link to Portfolio/Website"
                        placeholder="Link to Portfolio/Website"
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setFacultyPortfolioLink(event.target.value)
                        }}
                    />
                </div>
                <div className="done">
                    <Link className="button-link" to="/projectspage">
                        <Button
                            className="done-btn1"
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={createFacultyStaff}
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
