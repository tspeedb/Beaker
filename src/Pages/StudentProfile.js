import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import DropdownYear from '../Components/dropdownYear'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { storage } from 'firebase'
// import { storage } from './firebase/firebase' // It would be best to remove this import as storage is alreay imported above [AM]
// import DropdownMajor from '../Components/dropdownMajor'
// import DropdownMinor from '../Components/dropdownMinor'
import Uploadfile from '../Components/UploadFile'
import '../Styles/Dropdown.css'
// import dropdownMajor from '../Components/dropdownMajor'

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

function StudentProfile({ setMembers }) {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [nickname, setNickname] = useState('')
    const [major, setMajor] = useState('')
    const [major2, setMajor2] = useState('')
    const [minor, setMinor] = useState('')
    const [minor2, setMinor2] = useState('')
    const [link, setPortfolioLink] = useState(6)
    const [resume, setResume] = useState('')
    const [softskills, setSoftskills] = useState('')
    const [bio, setBio] = useState('')
    const [year, setYear] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [url, setURL] = useState('')
    const [students, setStudents] = useState([])

    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const handleSelectYear = (e) => {
        console.log(e)
        setYear(e)
    }
    const handleSelectMajor = (e) => {
        console.log(e)
        setMajor(e)
    }

    const handleSelectMajor2 = (e) => {
        console.log(e)
        setMajor2(e)
    }

    const handleSelectMinor = (e) => {
        console.log(e)
        setMinor(e)
    }

    const handleSelectMinor2 = (e) => {
        console.log(e)
        setMinor2(e)
    }
    const handleUploads = (f) => {
        setResume(f.target.files[0])
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
    const studentsCollectionRef = useMemo(() => collection(db, 'students'), [])
    const getStudents = async () => {
        const data = await getDocs(studentsCollectionRef)
        //loop through documents in collection
        setMembers(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    }
    const createStudent = async () => {
        await addDoc(studentsCollectionRef, {
            first: firstName,
            middle: middleName,
            last: lastName,
            nickname: nickname,
            year: year,
            major: major,
            major2: major2,
            minor: minor,
            minor2: minor2,
            portfolioLink: link,
            pronouns: pronouns,
            resume: resume,
            softskills: softskills,
            bio: bio,
            image: imageAsUrl,
        })

        getStudents()
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
    const classes = useStyles()

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
                        src={imageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="first-name"
                    placeholder="First Name(s)"
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="middle-name"
                    placeholder="Middle Name(s)"
                    onChange={(event) => {
                        setMiddleName(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="last-name"
                    placeholder="Last Name(s)"
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
                {/* //for the dropdowns, it woud be cleaner if these were seprated into different components so that we dont have over 1000 lines of code (MS) */}
                <form>
                    <label>
                        <select
                            className="year-dropdown"
                            onChange={(event) => {
                                setYear(event.target.value)
                            }}
                        >
                            <option value="default">Year</option>
                            <option value="freshman">Freshman</option>
                            <option value="sophomore">Sophomore</option>
                            <option value="junior">Junior</option>
                            <option value="senior">Senior</option>
                            <option value="graduate">Graduate</option>
                        </select>
                    </label>
                </form>
                <div></div>
                <br></br>
                {/* ## Rather than have a dropdown where a single major can be selected multiple times it may be easier from a UI perspective 
                ## to take a similar approach to how we do for PROWL when registering for classes. It may be best to have a textbox and dropdown based 
                ## of off user input where you can select at least one and potentially more majors/minors. [TB] */}
                <form>
                    <label>
                        <select
                            className="major-dropdown"
                            onChange={(event) => {
                                setMajor(event.target.value)
                            }}
                        >
                            <option value="default">Major 1</option>
                            <option value="ACCT">Accounting</option>
                            <option value="AFAM">
                                African American Studies
                            </option>
                            <option value="ANIM">Animation</option>
                            <option value="">Applied Mathematics</option>
                            <option value="">Applied Physics</option>
                            <option value="ARHS">Art History</option>
                            <option value="ASPA">
                                Asian and Pacific Studies
                            </option>
                            <option value="">Biochemistry</option>
                            <option value="BIOE">Bioethics</option>
                            <option value="BIOL">Biology</option>
                            <option value="BADM">
                                Business Administration
                            </option>
                            <option value="CHEM">Chemistry</option>
                            <option value="CLST">
                                Chicana/o and Latina/o Studies
                            </option>
                            <option value="CIVL">Civil Engineering</option>
                            <option value="CLAR">
                                Classics and Archaeology
                            </option>
                            <option value="CMST">Communication Studies</option>
                            <option value="CMSI">Computer Science</option>
                            <option value="DANC">Dance</option>
                            <option value="ECON">Economics</option>
                            <option value="EECE">Electrical Engineering</option>
                            <option value="ENGL">English</option>
                            <option value="ENTR">Entrepreneurship</option>
                            <option value="ENVS">Environmental Science</option>
                            <option value="EVST">Environmental Studies</option>
                            <option value="PROD">
                                Film and Television Production
                            </option>
                            <option value="FTVS">
                                Film, Television, and Media Studies
                            </option>
                            <option value="FNCE">Finance</option>
                            <option value="FREN">French</option>
                            <option value="HHSC">
                                Health and Human Sciences
                            </option>
                            <option value="HIST">History</option>
                            <option value="HMNT">Humanities</option>
                            <option value="ISBA">
                                Information Systems and Business Analytics
                            </option>
                            <option value="">International Relations</option>
                            <option value="JOUR">Journalism</option>
                            <option value="LBST">Liberal Studies</option>
                            <option value="MGMT">
                                Management and Leadership
                            </option>
                            <option value="MRKT">Marketing</option>
                            <option value="MATH">Mathematics</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="MDLG">Modern Languages</option>
                            <option value="MUSC">Music</option>
                            <option value="PHIL">Philosophy</option>
                            <option value="PHYS">Physics</option>
                            <option value="POLS">Political Science</option>
                            <option value="PSYC">Psychology</option>
                            <option value="RECA">Recording Arts</option>
                            <option value="SCWR">Screenwriting</option>
                            <option value="SOCL">Sociology</option>
                            <option value="SPAN">Spanish</option>
                            <option value="">
                                Statistics and Data Science
                            </option>
                            <option value="ART">Studio Arts</option>
                            <option value="THEA">Theatre Arts</option>
                            <option value="THST">Theological Studies</option>
                            <option value="URBN">Urban Studies</option>
                            <option value="WGST">
                                Women's and Gender Studies
                            </option>
                        </select>
                    </label>
                </form>
                <div></div>
                <br></br>
                <form>
                    <label>
                        <select
                            className="major-two-dropdown"
                            onChange={(event) => {
                                setMajor2(event.target.value)
                            }}
                        >
                            <option value="default">Major 2</option>
                            <option value="ACCT">Accounting</option>
                            <option value="AFAM">
                                African American Studies
                            </option>
                            <option value="ANIM">Animation</option>
                            <option value="">Applied Mathematics</option>
                            <option value="">Applied Physics</option>
                            <option value="ARHS">Art History</option>
                            <option value="ASPA">
                                Asian and Pacific Studies
                            </option>
                            <option value="">Biochemistry</option>
                            <option value="BIOE">Bioethics</option>
                            <option value="BIOL">Biology</option>
                            <option value="BADM">
                                Business Administration
                            </option>
                            <option value="CHEM">Chemistry</option>
                            <option value="CLST">
                                Chicana/o and Latina/o Studies
                            </option>
                            <option value="CIVL">Civil Engineering</option>
                            <option value="CLAR">
                                Classics and Archaeology
                            </option>
                            <option value="CMST">Communication Studies</option>
                            <option value="CMSI">Computer Science</option>
                            <option value="DANC">Dance</option>
                            <option value="ECON">Economics</option>
                            <option value="EECE">Electrical Engineering</option>
                            <option value="ENGL">English</option>
                            <option value="ENTR">Entrepreneurship</option>
                            <option value="ENVS">Environmental Science</option>
                            <option value="EVST">Environmental Studies</option>
                            <option value="PROD">
                                Film and Television Production
                            </option>
                            <option value="FTVS">
                                Film, Television, and Media Studies
                            </option>
                            <option value="FNCE">Finance</option>
                            <option value="FREN">French</option>
                            <option value="HHSC">
                                Health and Human Sciences
                            </option>
                            <option value="HIST">History</option>
                            <option value="HMNT">Humanities</option>
                            <option value="ISBA">
                                Information Systems and Business Analytics
                            </option>
                            <option value="">International Relations</option>
                            <option value="JOUR">Journalism</option>
                            <option value="LBST">Liberal Studies</option>
                            <option value="MGMT">
                                Management and Leadership
                            </option>
                            <option value="MRKT">Marketing</option>
                            <option value="MATH">Mathematics</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="MDLG">Modern Languages</option>
                            <option value="MUSC">Music</option>
                            <option value="PHIL">Philosophy</option>
                            <option value="PHYS">Physics</option>
                            <option value="POLS">Political Science</option>
                            <option value="PSYC">Psychology</option>
                            <option value="RECA">Recording Arts</option>
                            <option value="SCWR">Screenwriting</option>
                            <option value="SOCL">Sociology</option>
                            <option value="SPAN">Spanish</option>
                            <option value="">
                                Statistics and Data Science
                            </option>
                            <option value="ART">Studio Arts</option>
                            <option value="THEA">Theatre Arts</option>
                            <option value="THST">Theological Studies</option>
                            <option value="URBN">Urban Studies</option>
                            <option value="WGST">
                                Women's and Gender Studies
                            </option>
                        </select>
                    </label>
                </form>
                <div></div>
                <br></br>
                <form>
                    <label>
                        <select
                            className="minor-dropdown"
                            onChange={(event) => {
                                setMinor(event.target.value)
                            }}
                        >
                            <option value="default">Minor</option>
                            <option value="ACCT">Accounting</option>
                            <option value="AFAM">
                                African American Studies
                            </option>
                            <option value="ANIM">Animation</option>
                            <option value="">Applied Mathematics</option>
                            <option value="ARHS">Art History</option>
                            <option value="ASPA">
                                Asian and Pacific Studies
                            </option>
                            <option value="APAM">
                                Asian Pacific American Studies
                            </option>
                            <option value="">Biochemistry</option>
                            <option value="BIOE">Bioethics</option>
                            <option value="BIOL">Biology</option>
                            <option value="BADM">
                                Business Administration
                            </option>
                            <option value="CATH">Catholic Studies</option>
                            <option value="CHEM">Chemistry</option>
                            <option value="CLST">
                                Chicana/o and Latina/o Studies
                            </option>
                            <option value="CHIN">Chinese</option>
                            <option value="CLAR">
                                Classics and Archaeology
                            </option>
                            <option value="CMSI">Computer Science</option>
                            <option value="DANC">Dance</option>
                            <option value="ECON">Economics</option>
                            <option value="EECE">Electrical Engineering</option>
                            <option value="ENGL">English</option>
                            <option value="ENVS">Environmental Science</option>
                            <option value="EVST">Environmental Studies</option>
                            <option value="FTVS">
                                Film, Television, and Media Studies
                            </option>
                            <option value="FNCE">Finance</option>
                            <option value="FREN">French</option>
                            <option value="GRMN">German</option>
                            <option value="HEAS">Health and Society</option>
                            <option value="HIST">History</option>
                            <option value="IGI">
                                Interactive, Gaming, and Immersive Media
                            </option>
                            <option value="INBA">International Business</option>
                            <option value="">
                                International Documentary Production
                            </option>
                            <option value="">International Relations</option>
                            <option value="IRST">Irish Studies</option>
                            <option value="ITAL">Italian</option>
                            <option value="JWST">Jewish Studies</option>
                            <option value="JOUR">Journalism</option>
                            <option value="MATH">Math</option>
                            <option value="MDGK">Modern Greek Studies</option>
                            <option value="MUSC">Music</option>
                            <option value="PJST">
                                Peace and Justice Studies
                            </option>
                            <option value="PHIL">Philosophy</option>
                            <option value="PHYS">Physics</option>
                            <option value="POLS">Political Science</option>
                            <option value="PSYC">Psychology</option>
                            <option value="PRCX">Public Relations</option>
                            <option value="SCWR">Screenwriting</option>
                            <option value="SOCL">Sociology</option>
                            <option value="SPAN">Spanish</option>
                            <option value="">
                                Statistics and Data Science
                            </option>
                            <option value="ART">Studio Arts</option>
                            <option value="THEA">Theatre Arts</option>
                            <option value="THST">Theological Studies</option>
                            <option value="URBN">Urban Studies</option>
                            <option value="WGST">
                                Women's and Gender Studies
                            </option>
                        </select>
                    </label>
                </form>
                <div></div>
                <br></br>
                <form>
                    <label>
                        <select
                            className="minor-two-dropdown"
                            onChange={(event) => {
                                setMinor2(event.target.value)
                            }}
                        >
                            <option value="default">Minor 2</option>
                            <option value="ACCT">Accounting</option>
                            <option value="AFAM">
                                African American Studies
                            </option>
                            <option value="ANIM">Animation</option>
                            <option value="">Applied Mathematics</option>
                            <option value="ARHS">Art History</option>
                            <option value="ASPA">
                                Asian and Pacific Studies
                            </option>
                            <option value="APAM">
                                Asian Pacific American Studies
                            </option>
                            <option value="">Biochemistry</option>
                            <option value="BIOE">Bioethics</option>
                            <option value="BIOL">Biology</option>
                            <option value="BADM">
                                Business Administration
                            </option>
                            <option value="CATH">Catholic Studies</option>
                            <option value="CHEM">Chemistry</option>
                            <option value="CLST">
                                Chicana/o and Latina/o Studies
                            </option>
                            <option value="CHIN">Chinese</option>
                            <option value="CLAR">
                                Classics and Archaeology
                            </option>
                            <option value="CMSI">Computer Science</option>
                            <option value="DANC">Dance</option>
                            <option value="ECON">Economics</option>
                            <option value="EECE">Electrical Engineering</option>
                            <option value="ENGL">English</option>
                            <option value="ENVS">Environmental Science</option>
                            <option value="EVST">Environmental Studies</option>
                            <option value="FTVS">
                                Film, Television, and Media Studies
                            </option>
                            <option value="FNCE">Finance</option>
                            <option value="FREN">French</option>
                            <option value="GRMN">German</option>
                            <option value="HEAS">Health and Society</option>
                            <option value="HIST">History</option>
                            <option value="IGI">
                                Interactive, Gaming, and Immersive Media
                            </option>
                            <option value="INBA">International Business</option>
                            <option value="">
                                International Documentary Production
                            </option>
                            <option value="">International Relations</option>
                            <option value="IRST">Irish Studies</option>
                            <option value="ITAL">Italian</option>
                            <option value="JWST">Jewish Studies</option>
                            <option value="JOUR">Journalism</option>
                            <option value="MATH">Math</option>
                            <option value="MDGK">Modern Greek Studies</option>
                            <option value="MUSC">Music</option>
                            <option value="PJST">
                                Peace and Justice Studies
                            </option>
                            <option value="PHIL">Philosophy</option>
                            <option value="PHYS">Physics</option>
                            <option value="POLS">Political Science</option>
                            <option value="PSYC">Psychology</option>
                            <option value="PRCX">Public Relations</option>
                            <option value="SCWR">Screenwriting</option>
                            <option value="SOCL">Sociology</option>
                            <option value="SPAN">Spanish</option>
                            <option value="">
                                Statistics and Data Science
                            </option>
                            <option value="ART">Studio Arts</option>
                            <option value="THEA">Theatre Arts</option>
                            <option value="THST">Theological Studies</option>
                            <option value="URBN">Urban Studies</option>
                            <option value="WGST">
                                Women's and Gender Studies
                            </option>
                        </select>
                    </label>
                </form>
                <div></div>
                {/* ## More of an explanation/purpose to the soft skills and bio should be included. If the self-intro field is being used to create
                 a relationship between projects and the student user, then they should be sure to include areas of research they are interested in here [TB]
                 */}
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
                {/* // There maybe a better way to space out the fields by using
                bootstrap grid/css rather than using so many div, br (AM) */}
                <label>Tell us a little about yourself:</label>
                <br></br>
                <textarea
                    className="self-intro"
                    onChange={(event) => {
                        setBio(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <label className="resume">Upload CV or Resume</label>
                <div></div>
                <br></br>
                <Uploadfile> </Uploadfile>
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

/* <form onSubmit={handleUpload}>
                        <input type="file" onChange={handleImageAsFile} />
                    </form> */
