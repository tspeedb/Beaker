import React, { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import Uploadfile from '../Components/UploadFile'
import Layout from '../Components/Layout'

function EditProject({ match, projects, setProjects }) {
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState('')
    const [desc, setDesc] = useState('')
    const [memberAmount, setMemAmount] = useState('')
    const [reqMajor, setReqMajor] = useState('')
    const [reqYear, setReqYear] = useState('')
    const [softskills, setSoftSkills] = useState('')
    const [timeline, setTimeline] = useState('')
    const [checkedPaid, setCheckedPaid] = useState(false)
    const [checkedFunding, setCheckedFunding] = useState(false)
    const [checkedInternship, setCheckedIntership] = useState(false)
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const projectsCollectionRef = useMemo(() => collection(db, 'projects'), [])
    const getProjects = async () => {
        const data = await getDocs(projectsCollectionRef)
        //loop through documents in collection
        setProjects(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }

    const id = match.params.projectId

    useEffect(() => {
        console.log(projects)
        //send the network request to retrieve data for this project
        const selected = projects.filter((project) => project.key === id)[0]
        setProject(selected)
    }, [id, projects])

    //need change
    const editProject = async () => {
        await addDoc(projectsCollectionRef, {
            project: projectName,
            desc: desc,
            members: memberAmount,
            major: reqMajor,
            year: reqYear,
            softskills: softskills,
            timeline: timeline,
            image: imageAsUrl,
        })
        getProjects()
    }


    const handleChangePaid = () => {
        setCheckedPaid(!checkedPaid)
    }

    const handleChangeFunding = () => {
        setCheckedFunding(!checkedFunding)
    }

    const handleChangeInternship = () => {
        setCheckedIntership(!checkedInternship)
    }

    // console.log(imageAsFile)
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
                setImageAsUrl(result.info.url)
            }
        }
    )

    const openWidget = (e, widget) => {
        e.preventDefault()
        widget.open()
    }

    const majorOptions = [
        { value: 'Accounting', label: 'Accounting (ACCT)' },
        {
            value: 'African American Studies',
            label: 'African American Studies (AFAM)',
        },
        { value: 'Animation', label: 'Animation (ANIM)' },
        { value: 'Applied Mathematics', label: 'Applied Mathematics' },

        { value: 'Applied Physics', label: 'Applied Physics' },
        {
            value: 'Art History',
            label: 'Art History (ARHS)',
        },
        {
            value: 'Asian and Pacific Studies',
            label: 'Asian and Pacific Studies (ASPA)',
        },
        { value: 'Biochemistry', label: 'Biochemistry' },
        { value: 'Bioethics', label: 'Bioethics (BIOE)' },
        { value: 'Bioethics', label: 'Bioethics (BIOE)' },
        { value: 'Biology ', label: 'Biology (BIOL)' },
        {
            value: 'Business Administration',
            label: 'Business Administration (BADM)',
        },
        { value: 'Chemistry', label: 'Chemistry (CHEM)' },
        {
            value: 'Chicana/o and Latina/o Studies',
            label: 'Chicana/o and Latina/o Studies (CLST)',
        },
        { value: 'Civil Engineering', label: 'Civil Engineering (CIVL)' },
        {
            value: 'Classics and Archaeology',
            label: 'Classics and Archaeology (CLAR)',
        },
        {
            value: 'Communication Studies',
            label: 'Communication Studies (CMST)',
        },
        { value: 'Computer Science', label: 'Computer Science (CMSI)' },
        { value: 'Dance', label: 'Dance (DANC)' },
        { value: 'Economics', label: 'Economics (ECON)' },
        {
            value: 'Electrical Engineering',
            label: 'Electrical Engineering (EECE)',
        },
        { value: 'English', label: 'English (ENGL)' },
        { value: 'Entrepreneurship', label: 'Entrepreneurship (ENTR)' },
        {
            value: 'Environmental Science',
            label: 'Environmental Science (ENVS)',
        },
        {
            value: 'Environmental Studies',
            label: 'Environmental Studies (EVST)',
        },
        {
            value: 'Film and Television Production',
            label: 'Film and Television Production (PROD)',
        },
        {
            value: 'Film, Television, and Media Studies',
            label: 'Film, Television, and Media Studies (FTVS)',
        },
        { value: 'Finance', label: 'Finance (FNCE)' },
        { value: 'French', label: 'French (FREN)' },
        {
            value: 'Health and Human Sciences',
            label: 'Health and Human Sciences (HHSC)',
        },
        { value: 'History', label: 'History (HIST)' },
        { value: 'Humanities', label: 'Humanities (HMNT)' },
        {
            value: 'Information Systems and Business Analytics',
            label: 'Information Systems and Business Analytics (ISBA)',
        },
        { value: 'International Relations', label: 'International Relations' },
        { value: 'Journalism', label: 'Journalism (JOUR)' },
        { value: 'Liberal Studies', label: 'Liberal Studies (LBST)' },
        {
            value: 'Management and Leadership',
            label: 'Management and Leadership (MGMT)',
        },
        { value: 'Marketing', label: 'Marketing (MRKT)' },
        { value: 'Mathematics', label: 'Mathematics (MATH)' },
        {
            value: 'Mechanical Engineering',
            label: 'Mechanical Engineering (MECH)',
        },
        { value: 'Modern Languages', label: 'Modern Languages (MDLG)' },
        { value: 'Music', label: 'Music (MUSC)' },
        { value: 'Philosophy', label: 'Philosophy (PHIL)' },
        { value: 'Physics', label: 'Physics (PHYS)' },
        { value: 'Political Science', label: 'Political Science (POLS)' },
        { value: 'Psychology', label: 'Psychology (PSYC)' },
        { value: 'Recording Arts', label: 'Recording Arts (RECA)' },
        { value: 'Screenwriting', label: 'Screenwriting (SCWR)' },
        { value: 'Sociology', label: 'Sociology (SOCL)' },
        { value: 'Spanish', label: 'Spanish (SPAN)' },
        {
            value: 'Statistics and Data Science',
            label: 'Statistics and Data Science',
        },
        { value: 'Studio Arts', label: 'Studio Arts (ART)' },
        { value: 'Theatre Arts', label: 'Theatre Arts (THEA)' },
        { value: 'Theological Studies', label: 'Theological Studies (THST)' },
        { value: 'Urban Studies', label: 'Urban Studies (URBN)' },
        {
            value: 'Womens and Gender Studies',
            label: 'Womens and Gender Studies (WGST)',
        },
    ]

    const yearOptions = [
        { value: 'freshman', label: 'Freshman' },
        { value: 'sophomore', label: 'Sophomore' },
        { value: 'junior', label: 'Junior' },
        { value: 'senior', label: 'Senior' },
        { value: 'graduate', label: 'Graduate' },
    ]

    return (
        <Layout>
        <div className="new-profile">
            <div className="left-screen">
                <h1 className="left-text-info" id="left-text">
                    <br></br> Edit <br></br> Project!
                </h1>
            </div>
            {project && (
            <div className="right-screen">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1 className="new-user">Edit the {project.title} Project</h1>
                <p className="profile">Project Image</p>

                <div>
                    <img
                        style={{
                            width: 250,
                            height: 250,

                            paddingTop: 0,
                        }}
                        alt="profile"
                        src={`${process.env.PUBLIC_URL}/projectImages/${project.image}`}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="project-name"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(event) => {
                        setProjectName(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <textarea
                    type="text"
                    className="project-desc "
                    placeholder={project.description}
                    onfocus="this.value=''"
                    value={project.description}
                    onChange={(event) => {
                        setDesc(event.target.value)
                    }}
                    
                />
                <div></div>
                <br></br>
                <form>
                    <label className="members-needed">
                        Number of Members Needed:
                    </label>
                    <select>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                        <option value="six">6</option>
                        <option value="seven">7</option>
                        <option value="eight">8</option>
                        <option value="nine">9</option>
                        <option value="ten">10</option>
                    </select>
                </form>
                {/* <input
                    type="text"
                    className="member-amount "
                    placeholder="Number of Members Needed"
                    onChange={(event) => {
                        setMemAmount(event.target.value)
                    }}
                /> */}
                <div></div>
                <br></br>
                <label className="project-major">Preferred Majors:</label>
                <Select isMulti name="neededMajors" options={majorOptions} />
                {/* <input
                    type="text"
                    className="project-major "
                    placeholder="Needed Major(s)"
                    onChange={(event) => {
                        setReqMajor(event.target.value)
                    }}
                /> */}
                <div></div>
                <br></br>
                <div>
                    <label className="preferred-years">Preferred Years:</label>
                </div>
                <Select
                    isMulti
                    className="preferred-years-options"
                    options={yearOptions}
                />
                {/* <input
                    type="text"
                    className="preferred-year "
                    placeholder="Preferred Year(s)"
                    onChange={(event) => {
                        setReqYear(event.target.value)
                    }}
                /> */}
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="preferred-soft-skill "
                    placeholder="Preferred Soft Skill(s)"
                    onChange={(event) => {
                        setSoftSkills(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <form>
                    <label className="project-timeline">
                        Project Timeline:
                    </label>
                    <select>
                        <option value="timeline default"></option>
                        <option value="one semester">One Semester</option>
                        <option value="one year">One Year</option>
                        <option value="two years">Two Years</option>
                        <option value="three years">Three Years</option>
                        <option value="four years">Four Years</option>
                    </select>
                </form>
                {/* <input
                    type="text"
                    className="project-timeline "
                    placeholder="Project Timeline (Ex: 2 Years)"
                    onChange={(event) => {
                        setTimeline(event.target.value)
                    }}
                /> */}
                <div></div>
                <br></br>
                <input
                    className="paid-checkbox"
                    type="checkbox"
                    checked={checkedPaid}
                    onChange={handleChangePaid}
                />
                <label className="paid-label">Paid</label>
                <div></div>
                <input
                    className="funding-checkbox"
                    type="checkbox"
                    checked={checkedFunding}
                    onChange={handleChangeFunding}
                />
                <label className="funding-label">Funding Available</label>
                <div></div>
                <input
                    className="internship-checkbox"
                    type="checkbox"
                    checked={checkedInternship}
                    onChange={handleChangeInternship}
                />
                <label className="internship-label">Internship Credit</label>
                <div></div>
                <br></br>
                <div className="create-proj">
                    <Link className="button-link" to="/projectspage">
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
        </div>
        
   
        </Layout>
    )
}

export default EditProject
