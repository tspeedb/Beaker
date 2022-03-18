import React, { useState, useEffect, useMemo } from 'react'
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
import Autocomplete from '@mui/material/Autocomplete'

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

    const projectsCollectionRef = useMemo(() => collection(db, 'projects'), [])

    const id = match.params.projectId
    const projectCollectionRef = doc(db, 'projects', id)

    const getProjects = async () => {
        const data = await getDocs(projectsCollectionRef)
        projects = (data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }

    const [projectState, setProjectState] = useState({})

    const getProject = async () => {
        const data = await getDoc(projectCollectionRef)
        const selected = data.data()
        setProject(selected)
        setProjectState(selected)
        setEditedProjectName(selected?.title)
        setEditedDesc(selected?.description)
        setEditedSoftSkills(selected?.softskills)
        setEditedProjectStatus(selected?.status)
        setEditedMemAmount(selected?.members)
    }

    // const [editedReqMajor, setEditedReqMajor] = useState([])
    // const [editedReqYear, setEditedReqYear] = useState([])
    // const [editedTimeline, setEditedTimeline] = useState('')
    // const [editedIncentives, setEditedIncentives] = useState([])
    // const [editedImageAsUrl, setEditedImageAsUrl] = useState('')
    const [editedProjectName, setEditedProjectName] = useState('')
    const [editedDesc, setEditedDesc] = useState('')
    const [editedSoftSkills, setEditedSoftSkills] = useState('')
    const [editedProjectStatus, setEditedProjectStatus] = useState('')
    const [editedMemberAmount, setEditedMemAmount] = useState('')
    
    useEffect(() => {
        getProject()
    }, [id, projects])

    const compareValues = () => {
        let updatedProjectName, updatedDesc, updatedSoftSkills, updatedStatus, updatedMemAmount

        updatedProjectName = (projectState.title !== editedProjectName) ? editedProjectName : projectState.title
        setProjectName(updatedProjectName) 

        updatedDesc = (projectState.description !== editedDesc) ? editedDesc: projectState.description
        setDesc(updatedDesc) 

        updatedSoftSkills = (projectState.softskills !== editedSoftSkills) ? editedSoftSkills: projectState.softskills
        setSoftSkills(updatedSoftSkills) 

        updatedStatus = (projectState.status !== editedProjectStatus) ? editedProjectStatus: projectState.status
        setStatus(updatedStatus)

        updatedMemAmount = (projectState.members !== editedMemberAmount) ? editedMemberAmount: projectState.members
        setMemAmount(updatedMemAmount)

        return { updatedProjectName, updatedDesc, updatedSoftSkills, updatedStatus, updatedMemAmount }
    }

    const editProject = async () => {
        let { 
            updatedProjectName, 
            updatedDesc, 
            updatedSoftSkills, 
            updatedStatus, 
            updatedMemAmount
        } = compareValues()

        await updateDoc(projectCollectionRef, {
            title: updatedProjectName,
            status: updatedStatus,
            description: updatedDesc,
            members: updatedMemAmount,
            major: reqMajor,
            year: reqYear,
            softskills: updatedSoftSkills,
            timeline: timeline,
            incentives: incentives,
            image: imageAsUrl,
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
            // console.log('result:', result)
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

    const status = [
        'Open', 
        'Closed', 
        'Completed'
    ]
    
    const getDefaultStatus = () => {
        // console.log(projectState.status)
        // console.log(status[status.indexOf(projectState.status)])
        return status[status.indexOf(projectState.status)]
    }

    const incentiveOptions = [
        'Paid', 
        'Funding Available', 
        'Internship Credit'
    ]

    const handleChangeMemAmt = (event) => {
        setEditedMemAmount(event.target.value)
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

    const handleChangeStatus = (event) => {
        setEditedProjectStatus(event.target.value)
    }

    return (
        <Layout>
        <div className="new-profile">
            <div className="left-screen">
                <h1 className="left-text-info edit" id="left-text">
                        <br></br> Edit <br></br> Project!
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
                        }}
                        alt="profile"
                        src={project.image}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="project-name "
                    placeholder="Project Name"
                    defaultValue={project.title}
                    onChange={(event) => {
                        setEditedProjectName(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <textarea
                    type="text"
                    className="project-desc "
                    placeholder="Project Description"
                    defaultValue={project.description}
                    onChange={(event) => {
                        setEditedDesc(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div className="project-status">
                    <FormControl fullWidth>
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
                <div></div>
                <br></br>
                <div className="members-dropdown">
                    <FormControl fullWidth>
                        <InputLabel>Number Of Members Needed</InputLabel>
                        <Select
                            value={editedMemberAmount}
                            // defaultValue={getDefaultMembers}
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
                <div></div>
                <br></br>
                <div className="preferred-majors-options">
                    <FormControl fullWidth>
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
                <div></div>
                <br></br>
                <div className="preferred-years-options">
                    <FormControl fullWidth>
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
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="preferred-soft-skill "
                    placeholder="Preferred Soft Skill(s)"
                    defaultValue={project.softskills}
                    onChange={(event) => {
                        setEditedSoftSkills(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <div className="timeline-dropdown">
                    <FormControl fullWidth>
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
                <div></div>
                <br></br>
                <div className="incentive-options">
                    <FormControl fullWidth>
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