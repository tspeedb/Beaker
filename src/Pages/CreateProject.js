import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import Uploadfile from '../Components/UploadFile'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

function CreateProject({  }) {
    const [projects, setProjects] = useState([])
    const [projectName, setProjectName] = useState('')
    const [desc, setDesc] = useState('')
    const [memberAmount, setMemAmount] = useState('')
    const [reqMajor, setReqMajor] = useState([])
    const [reqYear, setReqYear] = useState([])
    const [softskills, setSoftSkills] = useState('')
    const [timeline, setTimeline] = useState('')
    const [incentives, setIncentives] = useState([])
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )
    const projNameRef = useRef()
    const projDescRef = useRef()
    const projPrefSoftSkillsRef = useRef()

    const handleChangeMemAmt = (event) => {
        setMemAmount(event.target.value)
    }

    const handleChangeMajor = (event) => {
        const {
            target: { value },
        } = event
        setReqMajor(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeYear = (event) => {
        const {
            target: { value },
        } = event
        setReqYear(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeTimeline = (event) => {
        setTimeline(event.target.value)
    }

    const handleChangeIncentives = (event) => {
        setIncentives(event.target.value)
    }

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        setImageAsFile(e.target.files[0])
    }

    function handleUpload(e) {
        e.preventDefault()
        const ref = storage.ref(`/Images/${imageAsFile.name}`)
        const uploadTask = ref.put(imageAsFile)
        uploadTask.on('state_changed', console.log, console.error, () => {
            ref.getDownloadURL().then((url) => {
                setImageAsFile(null)
                setImageAsUrl(url)
            })
        })
    }
    const projectsCollectionRef = useMemo(() => collection(db, 'projects'), [])
    const getProjects = async () => {
        const data = await getDocs(projectsCollectionRef)
        //loop through documents in collection
        setProjects(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }
    const createProject = async () => {
        await addDoc(projectsCollectionRef, {
            title: projectName,
            status: 'Open',
            description: desc,
            members: memberAmount,
            major: reqMajor,
            year: reqYear,
            softskills: softskills,
            timeline: timeline,
            incentives: incentives,
            image: imageAsUrl,
            creator: '',
            groupMembers: [], 
            applicants: [], 
            rejected: []
        })
        getProjects()
    }

    // useEffect(() => {
    //     const getStudents = async () => {
    //         const data = await getDocs(studentsCollectionRef)
    //         //loop through documents in collection
    //         setStudents(
    //             data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    //         )
    //     }
    //     getStudents()
    // }, [studentsCollectionRef])
    // const classes = useStyles()

    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        },

        (error, result) => {
            console.log('result:', result)
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info)
                setImageAsUrl(result.info.url)
            }
        }
    )

    const openWidget = (e, widget) => {
        e.preventDefault()
        widget.open()
    }

    const memberAmtOptions = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10+',
    ]

    const majorOptions = [
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

    const yearOptions = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Graduate',
    ]

    const timelineOptions = [
        '1 Semester',
        '1 Year',
        '2 Years',
        '3 Years',
        '4 Years+',
    ]

    const incentiveOptions = ['Paid', 'Funding Available', 'Internship Credit']

    return (
        <div className="new-profile">
            <div className="left-screen">
                <h1 className="left-text-info" id="left-text">
                    Create <br></br> A New <br></br> Project!
                </h1>
            </div>
            <div className="middle-screen"></div>
            <div className="right-screen-proj">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1 className="new-user">New Project</h1>
                <p className="profile">Project Image</p>
                <div>
                    <img
                        style={{
                            width: 250,
                            height: 250,
                            paddingTop: 0,
                        }}
                        alt="profile"
                        src={imageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <FormControl inputRef={projNameRef} />
                <div className="project-name">
                    <TextField
                        type="text"
                        className="proj-name"
                        label="Project Name"
                        placeholder="Project Name"
                        inputRef={projNameRef}
                        style={{ width: '55%' }}
                        onChange={(event) => {
                            setProjectName(event.target.value)
                        }}
                        required
                    />
                </div>
                <FormControl inputRef={projDescRef} />
                <div className="project-desc">
                    <TextField
                        multiline
                        rows={6}
                        label="Project Description"
                        placeholder="Project Description"
                        inputRef={projDescRef}
                        style={{ width: '55%' }}
                        onChange={(event) => {
                            setDesc(event.target.value)
                        }}
                        required
                    />
                </div>
                <div className="members-dropdown">
                    <FormControl style={{ width: '55%' }} required>
                        <InputLabel>Number Of Members Needed</InputLabel>
                        <Select
                            value={memberAmount}
                            onChange={handleChangeMemAmt}
                        >
                            {memberAmtOptions.map((memberAmtOption) => (
                                <MenuItem
                                    key={memberAmtOption}
                                    value={memberAmtOption}
                                >
                                    {memberAmtOption}
                                </MenuItem>
                            ))}
                            
                        </Select>
                    </FormControl>
                </div>
                <div className="preferred-majors-options">
                    <FormControl style={{ width: '55%' }} required>
                        <InputLabel>Preferred Majors</InputLabel>
                        <Select
                            
                            multiple
                            value={reqMajor}
                            onChange={handleChangeMajor}
                        >
                            {majorOptions.map((majorOption) => (
                                <MenuItem key={majorOption} value={majorOption}>
                                    {majorOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="preferred-years-options">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Preferred Years</InputLabel>
                        <Select
                            multiple
                            value={reqYear}
                            onChange={handleChangeYear}
                        >
                            {yearOptions.map((yearOption) => (
                                <MenuItem key={yearOption} value={yearOption}>
                                    {yearOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <FormControl inputRef={projPrefSoftSkillsRef} />
                <div className="preferred-soft-skill">
                    <TextField
                        type="text"
                        className="soft-skills"
                        label="Preferred Soft Skill(s)"
                        placeholder="Preferred Soft Skill(s)"
                        inputRef={projPrefSoftSkillsRef}
                        style={{ width: '55%' }}
                        onChange={(event) => {
                            setSoftSkills(event.target.value)
                        }}
                    />
                </div>
                <div className="timeline-dropdown">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Project Timeline</InputLabel>
                        <Select
                            value={timeline}
                            onChange={handleChangeTimeline}
                        >
                            {timelineOptions.map((timelineOption) => (
                                <MenuItem
                                    key={timelineOption}
                                    value={timelineOption}
                                >
                                    {timelineOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="incentive-options">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Incentives</InputLabel>
                        <Select
                            multiple
                            value={incentives}
                            onChange={handleChangeIncentives}
                        >
                            {incentiveOptions.map((incentiveOption) => (
                                <MenuItem
                                    key={incentiveOption}
                                    value={incentiveOption}
                                >
                                    {incentiveOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="create-proj">
                    <Link className="button-link" to="/projectspage">
                        <Button
                            className="post-proj-btn1"
                            variant="contained"
                            size="large"
                            onClick={createProject}
                        >
                            Post
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="right-most-screen"></div>
        </div>
    )
}

export default CreateProject
