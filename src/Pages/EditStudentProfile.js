import React, { useState, useEffect, useMemo, useRef } from 'react'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { doc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import Uploadfile from '../Components/UploadFile'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField } from '@mui/material'

function EditStudentProfile({ match, students }) {
    const [student, setStudent] = useState({})

    const studentsCollectionRef = useMemo(() => collection(db, 'students'), [])
    const id = match.params.memberId
    const studentCollectionRef = doc(db, 'students', id)
    const [studentState, setStudentState] = useState({})

    const getStudents = async () => {
        const data = await getDocs(studentsCollectionRef)
        students = data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    }

    const [editedFirstName, setEditedFirstName] = useState('')
    const [editedMiddleName, setEditedMiddleName] = useState('')
    const [editedLastName, setEditedLastName] = useState('')
    const [editedNickname, setEditedNickname] = useState('')
    const [editedMajor, setEditedMajor] = useState([])
    const [editedMinor, setEditedMinor] = useState([])
    const [editedPortfolioLink, setEditedPortfolioLink] = useState(6)
    const [editedResume, setEditedResume] = useState('')
    const [editedSoftskills, setEditedSoftskills] = useState('')
    const [editedBio, setEditedBio] = useState('')
    const [editedYear, setEditedYear] = useState('')
    const [editedPronouns, setEditedPronouns] = useState('')
    const [editedImageUrl, setEditedImageUrl] = useState('')

    const getStudent = async () => {
        const data = await getDoc(studentCollectionRef)
        const selected = data.data()
        setStudent(selected)
        setStudentState(selected)
        setEditedFirstName(selected?.first)
        setEditedMiddleName(selected?.middle)
        setEditedLastName(selected?.last)
        setEditedNickname(selected?.nickname)
        setEditedYear(selected?.year)
        setEditedMajor(selected?.major)
        setEditedMinor(selected?.minor)
        setEditedPortfolioLink(selected?.portfolioLink)
        setEditedPronouns(selected?.pronouns)
        setEditedResume(selected?.resume)
        setEditedSoftskills(selected?.softskills)
        setEditedBio(selected?.bio)
        setEditedImageUrl(selected?.image)
    }

    useEffect(() => {
        getStudent()
    }, [id, students])

    const compareValues = () => {
        let updatedFirstName =
            studentState.first !== editedFirstName
                ? editedFirstName
                : studentState.first
        setEditedFirstName(updatedFirstName)

        let updatedMiddleName =
            studentState.middle !== editedMiddleName
                ? editedMiddleName
                : studentState.middle
        setEditedMiddleName(updatedMiddleName)

        let updatedLastName =
            studentState.last !== editedLastName
                ? editedLastName
                : studentState.last
        setEditedLastName(updatedLastName)

        let updatedNickname =
            studentState.nickname !== editedNickname
                ? editedNickname
                : studentState.nickname
        setEditedNickname(updatedNickname)

        let updatedYear =
            studentState.year !== editedYear ? editedYear : studentState.year
        setEditedYear(updatedYear)

        let updatedMajor = !checkArrEquality(studentState.major, editedMajor)
            ? [...editedMajor]
            : [...studentState.major]
        setEditedMajor(updatedMajor)

        let updatedMinor = !checkArrEquality(studentState.minor, editedMinor)
            ? [...editedMinor]
            : [...studentState.minor]
        setEditedMinor(updatedMinor)

        let updatedPortfolioLink =
            studentState.portfolioLink !== editedPortfolioLink
                ? editedPortfolioLink
                : studentState.portfolioLink
        setEditedPortfolioLink(updatedPortfolioLink)

        let updatedPronouns =
            studentState.pronouns !== editedPronouns
                ? editedPronouns
                : studentState.pronouns
        setEditedPronouns(updatedPronouns)

        let updatedResume =
            studentState.resume !== editedResume
                ? editedResume
                : studentState.resume
        setEditedResume(updatedResume)

        let updatedSoftskills =
            studentState.softskills !== editedSoftskills
                ? editedSoftskills
                : studentState.softskills
        setEditedSoftskills(updatedSoftskills)

        let updatedBio =
            studentState.bio !== editedBio ? editedBio : studentState.bio
        setEditedBio(updatedBio)

        let updatedImageUrl =
            studentState.image !== editedImageUrl
                ? editedImageUrl
                : studentState.image
        setEditedImageUrl(updatedImageUrl)

        return {
            updatedFirstName,
            updatedMiddleName,
            updatedLastName,
            updatedNickname,
            updatedYear,
            updatedMajor,
            updatedMinor,
            updatedPortfolioLink,
            updatedPronouns,
            updatedResume,
            updatedSoftskills,
            updatedBio,
            updatedImageUrl,
        }
    }
    const editStudentProfile = async () => {
        let {
            updatedFirstName,
            updatedMiddleName,
            updatedLastName,
            updatedNickname,
            updatedYear,
            updatedMajor,
            updatedMinor,
            updatedPortfolioLink,
            updatedPronouns,
            updatedResume,
            updatedSoftskills,
            updatedBio,
            updatedImageUrl,
        } = compareValues()

        await updateDoc(studentCollectionRef, {
            first: updatedFirstName,
            middle: updatedMiddleName,
            last: updatedLastName,
            nickname: updatedNickname,
            year: updatedYear,
            major: updatedMajor,
            minor: updatedMinor,
            portfolioLink: updatedPortfolioLink,
            pronouns: updatedPronouns,
            resume: updatedResume,
            softskills: updatedSoftskills,
            bio: updatedBio,
            image: updatedImageUrl,
        })
        getStudents()
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
                setEditedImageUrl(result.info.url)
            }
        }
    )

    const openWidget = (e, widget) => {
        e.preventDefault()
        widget.open()
    }

    const checkArrEquality = (a, b) => {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length !== b.length) return false

        for (let i = 0; i < a.length; i++) {
            if (!a.includes(b[i]) || !b.includes(a[i])) return false
        }
        return true
    }

    const yearOptionsSP = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Graduate',
    ]

    const handleChangeYear = (event) => {
        setEditedYear(event.target.value)
    }

    const majorOptionsSP = [
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

    const handleChangeMajor = (event) => {
        const {
            target: { value },
        } = event
        setEditedMajor(typeof value === 'string' ? value.split(',') : value)
    }

    const minorOptions = [
        'Accounting (ACCT)',
        'African American Studies (AFAM)',
        'Animation (ANIM)',
        'Applied Mathematics',
        'Art History (ARHS)',
        'Asian and Pacific Studies (ASPA)',
        'Asian Pacific American Studies (APAM)',
        'Biochemistry',
        'Bioethics (BIOE)',
        'Biology (BIOL)',
        'Business Administration (BADM)',
        'Catholic Studies (CATH)',
        'Chemistry (CHEM)',
        'Chicana/o and Latina/o Studies (CLST)',
        'Chinese (CHIN)',
        'Classics and Archaeology (CLAR)',
        'Computer Science (CMSI)',
        'Dance (DANC)',
        'Economics (ECON)',
        'Electrical Engineering (EECE)',
        'English (ENGL)',
        'Environmental Science (ENVS)',
        'Environmental Studies (EVST)',
        'Film, Television, and Media Studies (FTVS)',
        'Finance (FNCE)',
        'French (FREN)',
        'German (GRMN)',
        'Health and Society (HEAS)',
        'History (HIST)',
        'Interactive, Gaming, and Immersive Media (IGI)',
        'International Business (INBA)',
        'International Documentary Production',
        'International Relations',
        'Irish Studies (IRST)',
        'Italian (ITAL)',
        'Jewish Studies (JWST)',
        'Journalism (JOUR)',
        'Math (MATH)',
        'Modern Greek Studies (MDGK)',
        'Music (MUSC)',
        'Peace and Justice Studies (PJST)',
        'Philosophy (PHIL)',
        'Physics (PHYS)',
        'Political Science (POLS)',
        'Psychology (PSYC)',
        'Public Relations (PRCX)',
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

    const handleChangeMinor = (event) => {
        const {
            target: { value },
        } = event
        setEditedMinor(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <div className="new-profile">
            <div className="left-screen-student">
                <h1 className="left-text-info" id="left-text">
                    Edit Your Profile
                </h1>
            </div>
            <div className="right-screen">
                <img className="profile-image" src={beaker} alt="logo" />
                <p className="profile">Profile Image</p>
                <div>
                    <img
                        style={{
                            width: 250,
                            height: 250,
                            clipPath: 'circle()',
                            paddingTop: 0,
                        }}
                        alt="profile"
                        src={editedImageUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <FormControl />
                <div className="first-name">
                    <TextField
                        type="text"
                        label="First Name(s)"
                        placeholder="First Name(s)"
                        value={editedFirstName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFirstName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="middle-name">
                    <TextField
                        type="text"
                        label="Middle Name(s)"
                        placeholder="Middle Name(s)"
                        value={editedMiddleName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedMiddleName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="last-name">
                    <TextField
                        type="text"
                        label="Last Name(s)"
                        placeholder="Last Name(s)"
                        value={editedLastName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedLastName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="preferred-name">
                    <TextField
                        type="text"
                        label="Nickname/Preferred Name"
                        placeholder="Nickname/Preferred Name"
                        value={editedNickname}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedNickname(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="pronouns">
                    <TextField
                        type="text"
                        label="Pronouns (Ex: she/her)"
                        placeholder="Pronouns (Ex: she/her)"
                        value={editedPronouns}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedPronouns(event.target.value)
                        }}
                    />
                </div>
                <div className="year-dropdown">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Year</InputLabel>
                        <Select value={editedYear} onChange={handleChangeYear}>
                            {yearOptionsSP.map((yearOption) => (
                                <MenuItem key={yearOption} value={yearOption}>
                                    {yearOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="major-dropdown">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Majors</InputLabel>
                        <Select
                            multiple
                            value={editedMajor}
                            onChange={handleChangeMajor}
                        >
                            {majorOptionsSP.map((majorOption) => (
                                <MenuItem key={majorOption} value={majorOption}>
                                    {majorOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="minor-dropdown">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Minors</InputLabel>
                        <Select
                            multiple
                            value={editedMinor}
                            onChange={handleChangeMinor}
                        >
                            {minorOptions.map((minorOption) => (
                                <MenuItem key={minorOption} value={minorOption}>
                                    {minorOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <FormControl />
                <div className="skills">
                    <TextField
                        type="text"
                        label="Soft Skills (separate by commas)"
                        placeholder="Soft Skills (separate by commas)"
                        value={editedSoftskills}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedSoftskills(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="self-intro">
                    <TextField
                        multiline
                        rows={6}
                        label="Tell us about yourself"
                        placeholder="Tell us about yourself"
                        value={editedBio}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedBio(event.target.value)
                        }}
                    />
                </div>
                {/* <label className="resume">Upload CV or Resume</label>
                <div></div>
                <br></br>
                <Uploadfile> </Uploadfile>
                <div></div>
                <br></br> */}
                <FormControl />
                <div className="portfolio">
                    <TextField
                        type="text"
                        label="Link to Portfolio/Website"
                        placeholder="Link to Portfolio/Website"
                        value={editedPortfolioLink}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedPortfolioLink(event.target.value)
                        }}
                    />
                </div>
                <div className="edit-student-profile">
                    <Link
                        className="edit-student-cancel"
                        to={`/aboutmember/${id}`}
                    >
                        <Button
                            className="cancel-student-edit"
                            size="large"
                            color="warning"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Link
                        className="edit-student-done"
                        to={`/aboutmember/${id}`}
                    >
                        <Button
                            type="button"
                            className="edit-student"
                            size="large"
                            variant="contained"
                            onClick={editStudentProfile}
                        >
                            Save
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EditStudentProfile
