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

function EditFacultyStaffProfile({ match, fsMembers }) {
    const [fsMember, setFSMember] = useState({})

    const facultystaffCollectionRef = useMemo(
        () => collection(db, 'fsMembers'),
        []
    )
    const id = match.params.memberId
    const fsMemberCollectionRef = doc(db, 'fsMembers', id)
    const [fsMemberState, setFSMemberState] = useState({})

    const getFSMembers = async () => {
        const data = await getDocs(facultystaffCollectionRef)
        fsMembers = data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    }

    const [editedTitle, setEditedTitle] = useState('')
    const [editedFacultyFirstName, setEditedFacultyFirstName] = useState('')
    const [editedFacultyMiddleName, setEditedFacultyMiddleName] = useState('')
    const [editedFacultyLastName, setEditedFacultyLastName] = useState('')
    const [editedFacultyNickname, setEditedFacultyNickname] = useState('')
    const [editedFacultyPronouns, setEditedFacultyPronouns] = useState('')
    const [editedDepartment, setEditedDepartment] = useState('')
    const [editedLabDesc, setEditedLabDesc] = useState('')
    const [editedFacultyLink, setEditedFacultyPortfolioLink] = useState(6)
    const [editedFacultyImageAsFile, setFacultyImageAsFile] = useState(null)
    const [editedFacultyImageAsUrl, setEditedFacultyImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const getFSMember = async () => {
        const data = await getDoc(fsMemberCollectionRef)
        const selected = data.data()
        setFSMember(selected)
        setFSMemberState(selected)
        setEditedTitle(selected?.title)
        setEditedFacultyFirstName(selected?.facultyFirst)
        setEditedFacultyMiddleName(selected?.facultyMiddle)
        setEditedFacultyLastName(selected?.facultyLast)
        setEditedFacultyNickname(selected?.facultyNickname)
        setEditedFacultyPronouns(selected?.facultyPronouns)
        setEditedDepartment(selected?.department)
        setEditedLabDesc(selected?.labDesc)
        setEditedFacultyPortfolioLink(selected?.facultyPortfolioLink)
        setEditedFacultyImageAsUrl(selected?.facultyImage)
    }

    useEffect(() => {
        getFSMember()
    }, [id, fsMembers])

    const compareValues = () => {
        let updatedTitle =
            fsMemberState.title !== editedTitle
                ? editedTitle
                : fsMemberState.title
        setEditedTitle(updatedTitle)

        let updatedFacultyFirstName =
            fsMemberState.facultyFirst !== editedFacultyFirstName
                ? editedFacultyFirstName
                : fsMemberState.facultyFirst
        setEditedFacultyFirstName(updatedFacultyFirstName)

        let updatedFacultyMiddleName =
            fsMemberState.facultyMiddle !== editedFacultyMiddleName
                ? editedFacultyMiddleName
                : fsMemberState.facultyMiddle
        setEditedFacultyMiddleName(updatedFacultyMiddleName)

        let updatedFacultyLastName =
            fsMemberState.facultyLast !== editedFacultyLastName
                ? editedFacultyLastName
                : fsMemberState.facultyLast
        setEditedFacultyLastName(updatedFacultyLastName)

        let updatedFacultyNickname =
            fsMemberState.facultyNickname !== editedFacultyNickname
                ? editedFacultyNickname
                : fsMemberState.facultyNickname
        setEditedFacultyNickname(updatedFacultyNickname)

        let updatedFacultyPronouns =
            fsMemberState.facultyPronouns !== editedFacultyPronouns
                ? editedFacultyPronouns
                : fsMemberState.facultyPronouns
        setEditedFacultyPronouns(updatedFacultyPronouns)

        let updatedDepartment =
            fsMemberState.department !== editedDepartment
                ? editedDepartment
                : fsMemberState.department
        setEditedDepartment(updatedDepartment)

        let updatedLabDesc =
            fsMemberState.labDesc !== editedLabDesc
                ? editedLabDesc
                : fsMemberState.labDesc
        setEditedLabDesc(updatedLabDesc)

        let updatedFacultyPortfolioLink =
            fsMemberState.facultyPortfolioLink !== editedFacultyLink
                ? editedFacultyLink
                : fsMemberState.facultyPortfolioLink
        setEditedFacultyPortfolioLink(updatedFacultyPortfolioLink)

        let updatedFacultyImageAsUrl =
            fsMemberState.facultyImage !== editedFacultyImageAsUrl
                ? editedFacultyImageAsUrl
                : fsMemberState.facultyImage
        setEditedFacultyImageAsUrl(updatedFacultyImageAsUrl)

        return {
            updatedTitle,
            updatedFacultyFirstName,
            updatedFacultyMiddleName,
            updatedFacultyLastName,
            updatedFacultyNickname,
            updatedFacultyPronouns,
            updatedDepartment,
            updatedLabDesc,
            updatedFacultyPortfolioLink,
            updatedFacultyImageAsUrl,
        }
    }
    const editFacultyStaffProfile = async () => {
        let {
            updatedTitle,
            updatedFacultyFirstName,
            updatedFacultyMiddleName,
            updatedFacultyLastName,
            updatedFacultyNickname,
            updatedFacultyPronouns,
            updatedDepartment,
            updatedLabDesc,
            updatedFacultyPortfolioLink,
            updatedFacultyImageAsUrl,
        } = compareValues()

        await updateDoc(fsMemberCollectionRef, {
            title: updatedTitle,
            facultyFirst: updatedFacultyFirstName,
            facultyMiddle: updatedFacultyMiddleName,
            facultyLast: updatedFacultyLastName,
            facultyNickname: updatedFacultyNickname,
            facultyPronouns: updatedFacultyPronouns,
            department: updatedDepartment,
            labDesc: updatedLabDesc,
            facultyPortfolioLink: updatedFacultyPortfolioLink,
            facultyImage: updatedFacultyImageAsUrl,
        })
        getFSMembers()
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
                setEditedFacultyImageAsUrl(result.info.url)
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

    const handleChangeDepartment = (event) => {
        const {
            target: { value },
        } = event
        setEditedDepartment(
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <div className="new-profile">
            <div className="left-screen-fs">
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
                        src={editedFacultyImageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <FormControl />
                <div className="fs-title">
                    <TextField
                        type="text"
                        label="Title (Ex: Professor)"
                        placeholder="Title (Ex: Professor)"
                        value={editedTitle}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedTitle(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-first-name">
                    <TextField
                        type="text"
                        label="First Name(s)"
                        placeholder="First Name(s)"
                        value={editedFacultyFirstName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyFirstName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-middle-name">
                    <TextField
                        type="text"
                        label="Middle Name(s)"
                        placeholder="Middle Name(s)"
                        value={editedFacultyMiddleName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyMiddleName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-last-name">
                    <TextField
                        type="text"
                        label="Last Name(s)"
                        placeholder="Last Name(s)"
                        value={editedFacultyLastName}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyLastName(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-preferred-name">
                    <TextField
                        type="text"
                        label="Preferred way to be addressed"
                        placeholder="Preferred way to be addressed"
                        value={editedFacultyNickname}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyNickname(event.target.value)
                        }}
                    />
                </div>
                <FormControl />
                <div className="fs-pronouns">
                    <TextField
                        type="text"
                        label="Pronouns (Ex: she/her)"
                        placeholder="Pronouns (Ex: she/her)"
                        value={editedFacultyPronouns}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyPronouns(event.target.value)
                        }}
                    />
                </div>
                <div className="department-options">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Department</InputLabel>
                        <Select
                            value={editedDepartment}
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
                        value={editedLabDesc}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedLabDesc(event.target.value)
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
                        value={editedFacultyLink}
                        style={{ width: '50%' }}
                        onChange={(event) => {
                            setEditedFacultyPortfolioLink(event.target.value)
                        }}
                    />
                </div>
                <div className="edit-faculty-profile">
                    <Link
                        className="edit-faculty-cancel"
                        to={`/aboutmember/${id}`}
                    >
                        <Button
                            className="cancel-faculty-edit"
                            size="large"
                            color="warning"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Link
                        className="edit-faculty-done"
                        to={`/aboutmember/${id}`}
                    >
                        <Button
                            className="edit-faculty"
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={editFacultyStaffProfile}
                        >
                            Save
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EditFacultyStaffProfile
