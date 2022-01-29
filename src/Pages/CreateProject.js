import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import Uploadfile from '../Components/UploadFile'
import '../Styles/Dropdown.css'

// const useStyles = makeStyles((theme) => ({
//     yearDropdown: {
//         color: 'grey',
//         textTransform: 'lowercase',
//         fontSize: '18px',
//         justifyContent: 'end',
//     },
//     majorDropdown: {
//         color: 'grey',
//         textTransform: 'lowercase',
//         fontSize: '18px',
//         justifyContent: 'end',
//     },
//     minorDropdown: {
//         color: 'grey',
//         textTransform: 'lowercase',
//         fontSize: '18px',
//         justifyContent: 'end',
//     },
// }))

function CreateProject({ setProjects }) {
    const [projectName, setProjectName] = useState('')
    const [desc, setDesc] = useState('')
    const [memberAmount, setMemAmount] = useState('')
    const [reqMajor, setReqMajor] = useState('')
    const [reqMinor, setReqMinor] = useState('')
    const [reqYear, setReqYear] = useState('')
    const [softskills, setSoftSkills] = useState('')
    const [timeline, setTimeline] = useState('')
    const [checked, setChecked] = useState(false)
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const handleChange = () => {
        setChecked(!checked)
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
            project: projectName,
            desc: desc,
            members: memberAmount,
            major: reqMajor,
            minor: reqMinor,
            year: reqYear,
            softskills: softskills,
            timeline: timeline,
            image: imageAsUrl,
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

    return (
        <div className="new-profile">
            <div className="left-screen">
                <h1 className="left-text-info" id="left-text">
                    Create <br></br> New <br></br> Project!
                </h1>
            </div>
            <div className="right-screen">
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
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="project-name "
                    placeholder="Project Name"
                    onChange={(event) => {
                        setProjectName(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <textarea
                    type="text"
                    className="project-desc "
                    placeholder="Project Description"
                    onChange={(event) => {
                        setDesc(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <form>
                    <label>
                        Number of Members Needed:
                        <select value="Number of members">
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
                    </label>
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
                <form>
                    <label>
                        <select>
                            <option value="Accounting">
                                Accounting (ACCT)
                            </option>
                            <option value="African American Studies">
                                African American Studies (AFAM)
                            </option>
                            <option value="Animation">Animation (ANIM)</option>
                            <option value="Applied Mathematics">
                                Applied Mathematics
                            </option>
                            <option value="Applied Physics">
                                Applied Physics
                            </option>
                            <option value="Art History">
                                Art History (ARHS)
                            </option>
                            <option value="Asian and Pacific Studies">
                                Asian and Pacific Studies (ASPA)
                            </option>
                            <option value="Biochemistry">Biochemistry</option>
                            <option value="Bioethics">Bioethics (BIOE)</option>
                            <option value="Biology">Biology (BIOL)</option>
                            <option value="Business Administration">
                                Business Administration (BADM)
                            </option>
                            <option value="Chemistry">Chemistry (CHEM)</option>
                            <option value="Chicana/o and Latina/o Studies">
                                Chicana/o and Latina/o Studies (CLST)
                            </option>
                            <option value="Civil Engineering">
                                Civil Engineering (CIVL)
                            </option>
                            <option value="Classics and Archaeology">
                                Classics and Archaeology (CLAR)
                            </option>
                            <option value="Communication Studies">
                                Communication Studies (CMST)
                            </option>
                            <option value="Computer Science">
                                Computer Science (CMSI)
                            </option>
                            <option value="Dance">Dance (DANC)</option>
                            <option value="Economics">Economics (ECON)</option>
                            <option value="Electrical Engineering">
                                Electrical Engineering (EECE)
                            </option>
                            <option value="English">English (ENGL)</option>
                            <option value="Entrepreneurship">
                                Entrepreneurship (ENTR)
                            </option>
                            <option value="Environmental Science">
                                Environmental Science (ENVS)
                            </option>
                            <option value="Environmental Studies">
                                Environmental Studies (EVST)
                            </option>
                            <option value="Film and Television Production">
                                Film and Television Production (PROD)
                            </option>
                            <option value="Film, Television, and Media Studies">
                                Film, Television, and Media Studies (FTVS)
                            </option>
                            <option value="Finance">Finance (FNCE)</option>
                            <option value="French">French (FREN)</option>
                            <option value="Health and Human Sciences">
                                Health and Human Sciences (HHSC)
                            </option>
                            <option value="History">History (HIST)</option>
                            <option value="Humanities">
                                Humanities (HMNT)
                            </option>
                            <option value="Information Systems and Business Analytics">
                                Information Systems and Business Analytics
                                (ISBA)
                            </option>
                            <option value="International Relations">
                                International Relations
                            </option>
                            <option value="Journalism">
                                Journalism (JOUR)
                            </option>
                            <option value="Liberal Studies">
                                Liberal Studies (LBST)
                            </option>
                            <option value="Management and Leadership">
                                Management and Leadership (MGMT)
                            </option>
                            <option value="Marketing">Marketing (MRKT)</option>
                            <option value="Mathematics">
                                Mathematics (MATH)
                            </option>
                            <option value="Mechanical Engineering">
                                Mechanical Engineering (MECH)
                            </option>
                            <option value="Modern Languages">
                                Modern Languages (MDLG)
                            </option>
                            <option value="Music">Music (MUSC)</option>
                            <option value="Philosophy">
                                Philosophy (PHIL)
                            </option>
                            <option value="Physics">Physics (PHYS)</option>
                            <option value="Political Science">
                                Political Science (POLS)
                            </option>
                            <option value="Psychology">
                                Psychology (PSYC)
                            </option>
                            <option value="Recording Arts">
                                Recording Arts (RECA)
                            </option>
                            <option value="Screenwriting">
                                Screenwriting (SCWR)
                            </option>
                            <option value="Sociology">Sociology (SOCL)</option>
                            <option value="Spanish">Spanish (SPAN)</option>
                            <option value="Statistics and Data Science">
                                Statistics and Data Science
                            </option>
                            <option value="Studio Arts">
                                Studio Arts (ART)
                            </option>
                            <option value="Theatre Arts">
                                Theatre Arts (THEA)
                            </option>
                            <option value="Theological Studies">
                                Theological Studies (THST)
                            </option>
                            <option value="Urban Studies">
                                Urban Studies (URBN)
                            </option>
                            <option value="Women's and Gender Studies">
                                Women's and Gender Studies (WGST)
                            </option>
                        </select>
                    </label>
                </form>
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
                <input
                    type="text"
                    className="preferred-year "
                    placeholder="Preferred Year(s)"
                    onChange={(event) => {
                        setReqYear(event.target.value)
                    }}
                />
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
                <input
                    type="text"
                    className="project-timeline "
                    placeholder="Project Timeline (Ex: 2 Years)"
                    onChange={(event) => {
                        setTimeline(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    className="paid-checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <label className="paid-label">Paid</label>
                <div></div>
                <br></br>
                <input
                    className="funding-checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <label className="funding-label">Funding Available</label>
                <div></div>
                <br></br>
                <input
                    className="internship-checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
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
                            onClick={createProject}
                        >
                            Post
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CreateProject
