import React, { useState, useEffect, useMemo, useRef } from 'react'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { doc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import Layout from '../Components/Layout'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Box from '@material-ui/core/Box';
import Uploadfile from '../Components/UploadFile'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField } from '@mui/material'

function EditProject({ match, projects }) {
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState('')
    const [projectStatus, setStatus] = useState('')
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
    const [creator, setCreator] = useState('')
    const [groupMembers, setGroupMembers] = useState([])
    const [applicants, setApplicants] = useState([])
    const [rejected, setRejected] = useState([])

    const projNameRef = useRef()
    const projDescRef = useRef()
    const projPrefSoftSkillsRef = useRef()

    const projectsCollectionRef = useMemo(() => collection(db, 'projects'), [])
    const id = match.params.projectId
    const projectCollectionRef = doc(db, 'projects', id)
    const [projectState, setProjectState] = useState({})

    const getProjects = async () => {
        const data = await getDocs(projectsCollectionRef)
        projects = (data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }

    const [editedProjectName, setEditedProjectName] = useState('')
    const [editedDesc, setEditedDesc] = useState('')
    const [editedSoftSkills, setEditedSoftSkills] = useState('')
    const [editedProjectStatus, setEditedProjectStatus] = useState('')
    const [editedMemberAmount, setEditedMemAmount] = useState('')
    const [editedReqMajor, setEditedReqMajor] = useState([])
    const [editedReqYear, setEditedReqYear] = useState([])
    const [editedTimeline, setEditedTimeline] = useState('')
    const [editedIncentives, setEditedIncentives] = useState([])
    const [editedImageAsUrl, setEditedImageAsUrl] = useState('')

    const getProject = async () => {
        const data = await getDoc(projectCollectionRef)
        const selected = data.data()
        setProject(selected)
        setProjectState(selected)
        setEditedProjectName(selected?.title)
        setEditedProjectStatus(selected?.status)
        setEditedDesc(selected?.description)
        setEditedMemAmount(selected?.members)
        setEditedReqMajor(selected?.major)
        setEditedReqYear(selected?.year)
        setEditedSoftSkills(selected?.softskills)
        setEditedTimeline(selected?.timeline)
        setEditedIncentives(selected?.incentives)
        setEditedImageAsUrl(selected?.image)
        setCreator(selected?.creator)
        setGroupMembers(selected?.groupMembers)
        setApplicants(selected?.applicants)
        setRejected(selected?.rejected)
    }

    useEffect(() => {
        getProject()
    }, [id, projects])

    const compareValues = () => {
        let updatedProjectName = (projectState.title !== editedProjectName) ? editedProjectName : projectState.title
        setProjectName(updatedProjectName) 

        let updatedStatus = (projectState.status !== editedProjectStatus) ? editedProjectStatus : projectState.status
        setStatus(updatedStatus)

        let updatedDesc = (projectState.description !== editedDesc) ? editedDesc : projectState.description
        setDesc(updatedDesc) 

        let updatedMemAmount = (projectState.members !== editedMemberAmount) ? editedMemberAmount : projectState.members
        setMemAmount(updatedMemAmount)

        let updatedReqMajor = (!checkArrEquality(projectState.major, editedReqMajor)) ? [...editedReqMajor] : [...projectState.major]
        setReqMajor(updatedReqMajor)

        let updatedReqYear = (!checkArrEquality(projectState.year, editedReqYear)) ? [...editedReqYear] : [...projectState.year]
        setReqYear(updatedReqYear)

        let updatedSoftSkills = (projectState.softskills !== editedSoftSkills) ? editedSoftSkills : projectState.softskills
        setSoftSkills(updatedSoftSkills) 

        let updatedTimeline = (projectState.timeline !== editedTimeline) ? editedTimeline : projectState.timeline
        setTimeline(updatedTimeline)

        let updatedIncentives = (!checkArrEquality(projectState.incentives, editedIncentives)) ? [...editedIncentives] : [...projectState.incentives]
        setIncentives(updatedIncentives)

        let updatedImageAsUrl = (projectState.image !== editedImageAsUrl) ? editedImageAsUrl : projectState.image
        setImageAsUrl(updatedTimeline)

        return { 
            updatedProjectName, 
            updatedStatus, 
            updatedDesc, 
            updatedMemAmount,
            updatedReqMajor, 
            updatedReqYear, 
            updatedSoftSkills,  
            updatedTimeline,
            updatedIncentives,
            updatedImageAsUrl
        }
    }

    const editProject = async () => {
        let { 
            updatedProjectName, 
            updatedStatus, 
            updatedDesc, 
            updatedMemAmount,
            updatedReqMajor, 
            updatedReqYear, 
            updatedSoftSkills,  
            updatedTimeline,
            updatedIncentives,
            updatedImageAsUrl
        } = compareValues()

        await updateDoc(projectCollectionRef, {
            title: updatedProjectName,
            status: updatedStatus,
            description: updatedDesc,
            members: updatedMemAmount,
            major: updatedReqMajor,
            year: updatedReqYear,
            softskills: updatedSoftSkills,
            timeline: updatedTimeline,
            incentives: updatedIncentives,
            image: updatedImageAsUrl,
            creator: creator,
            groupMembers: groupMembers, 
            applicants: applicants, 
            rejected: rejected
        })
        getProjects()
    }

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
    
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        },

        (error, result) => {
            console.log('result:', result)
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info)
                setEditedImageAsUrl(result.info.url)
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

    const handleChangeMemAmt = (event) => {
        setEditedMemAmount(event.target.value)
    }

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

    const handleChangeMajor = (event) => {
        const {
            target: { value },
        } = event
        setEditedReqMajor(typeof value === 'string' ? value.split(',') : value)
    }

    const yearOptions = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Graduate',
    ]

    const handleChangeYear = (event) => {
        const {
            target: { value },
        } = event
        setEditedReqYear(typeof value === 'string' ? value.split(',') : value)
    }

    const timelineOptions = [
        '1 Semester',
        '1 Year',
        '2 Years',
        '3 Years',
        '4 Years+',
    ]

    const handleChangeTimeline = (event) => {
        setEditedTimeline(event.target.value)
    }

    const status = [
        'Open', 
        'Closed', 
        'Completed'
    ]

    const handleChangeStatus = (event) => {
        setEditedProjectStatus(event.target.value)
    }

    const incentiveOptions = [
        'Paid', 
        'Funding Available', 
        'Internship Credit'
    ]

    const handleChangeIncentives = (event) => {
        setEditedIncentives(event.target.value)
    }

    return (
        <Layout>
        <div className="new-profile">
        <div className="left-screen-project">
                <h1 className="left-text-info" id="left-text">
                     Edit<br></br> Project!
                </h1>
            </div>
            <div className="middle-screen">
            <Box display='flex' flexGrow={1} >
                <Link to={`/projectdetails/${id}`}>
                    <ArrowBackIosIcon style={{ color: 'black', paddingTop: '10', paddingLeft: '10' }}></ArrowBackIosIcon>
                </Link>
                </Box>
            </div>

            {project && (
            <div className="right-screen-proj">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1 className="new-user">Edit {project.title} Project</h1>
                <p className="profile">Project Image</p>
                <div>
                    <img
                        style={{
                            width: 250,
                            height: 250,
                            paddingTop: 0,
                            paddingTop: '0%',
                            borderRadius: '5px',
                            textShadow: '2px 2px 5px',
                        }}
                        alt="profile"
                        src={editedImageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <FormControl inputRef={projNameRef} />
                <div className='proj-name'>
                <TextField
                    type="text"
                    className="project-name"
                    placeholder="Project Name"
                    label="Project Name"
                    inputRef={projNameRef}
                    value={editedProjectName}
                    style={{ width: '55%' }}
                    onChange={(event) => {
                        setEditedProjectName(event.target.value)
                    }}
                    required
                />
                </div>
                <FormControl inputRef={projDescRef}/>
                <div className='project-desc'>
                <TextField
                    multiline
                    rows={6}
                    type="text"
                    label="Project Description"
                    className="project-desc"
                    placeholder="Project Description"
                    inputRef={projDescRef}
                    value={editedDesc}
                    style={{ width: '55%' }}
                    onChange={(event) => {
                        setEditedDesc(event.target.value)
                    }}
                    required
                />
                </div>
                <div className="project-status">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Project Status</InputLabel>
                        <Select
                            value={editedProjectStatus}
                            onChange={handleChangeStatus}
                        >
                            {status.map((s) => (
                                <MenuItem
                                    key={s}
                                    value={s}
                                >
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="members-dropdown">
                    <FormControl style={{ width: '55%' }} required>
                        <InputLabel>Number Of Members Needed</InputLabel>
                        <Select
                            value={editedMemberAmount}
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
                            value={editedReqMajor}
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
                            value={editedReqYear}
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
                <FormControl inputRef={projPrefSoftSkillsRef}/>
                <div className='preferred-soft-skill'>
                <TextField
                    type="text"
                    className="preferred-soft-skill"
                    label="Preferred Soft Skill(s)"
                    placeholder="Preferred Soft Skill(s)"
                    inputRef={projPrefSoftSkillsRef}
                    value={editedSoftSkills}
                    style={{ width: '55%' }}
                    onChange={(event) => {
                        setEditedSoftSkills(event.target.value)
                    }}
                />
                </div>
                <div className="timeline-dropdown">
                    <FormControl style={{ width: '55%' }}>
                        <InputLabel>Project Timeline</InputLabel>
                        <Select
                            value={editedTimeline}
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
                            value={editedIncentives}
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
                <div></div>
                <br></br>
                <div className="create-proj">
                    <Link className="button-link" to={`/projectdetails/${id}`}>
                        <Button
                            className="post-proj-btn1"
                            size="large"
                            color='warning'
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Link className="button-link" to={`/projectdetails/${id}`}>
                        <Button
                            className="post-proj-btn1"
                            size="large"
                            color="primary"
                            onClick={editProject}
                        >
                            Save
                        </Button>
                    </Link>   
                </div>
            </div>
            )}
            <div className="right-most-screen"></div>
        </div>
        </Layout>
    )
}

export default EditProject