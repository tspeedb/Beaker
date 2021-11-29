import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
// import DropdownYear from '../Components/dropdownYear'
import 'firebase/firestore'
import { db } from '../firebase'
import { collection, getDocs, addDoc /*storage*/ } from 'firebase/firestore'
// import DropdownMajor from '../Components/dropdownMajor'
// import DropdownMinor from '../Components/dropdownMinor'
import Uploadfile from '../Components/UploadFile'
import Profileimage from '../Components/ProfileImageUpload'
import '../Styles/Dropdown.css'

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
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [nickname, setNickname] = useState(3)
    const [major, setMajor] = useState('')
    const [major2, setMajor2] = useState('')
    const [minor, setMinor] = useState('')
    const [minor2, setMinor2] = useState('')
    const [link, setPortfolioLink] = useState(6)
    const [resume, setResume] = useState(null)
    const [softskills, setSoftskills] = useState(8)
    const [summary, setSummary] = useState(9)
    const [year, setYear] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [url, setURL] = useState('')
    const [students, setStudents] = useState([])

    const handleSelect = (e) => {
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
    // const handleUploads = (f) => {
    //     // setResume(f.target.files[0])
    // }

    // function storeImage() {}

    // function storeResume() {}

    const studentsCollectionRef = useMemo(() => collection(db, 'students'), [])
    const createStudent = async () => {
        await addDoc(studentsCollectionRef, {
            First: firstName,
            Middle: middleName,
            Last: lastName,
            Nickname: nickname,
            Year: year,
            Major: major,
            Major2: major2,
            Minor: minor,
            Minor2: minor2,
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
                <h1 className="text-info" id="text">
                    Create <br></br> Your <br></br> Profile
                </h1>
            </div>
            <div className="right-screen">
                <img className="profile-image" src={beaker} alt="logo" />
                <h1 className="new-user">New User</h1>
                <p className="profile">Profile</p>
                <Profileimage></Profileimage>
                <div></div>
                <br></br>
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
                    {/* <div>Year:</div> */}
                    {/* <DropdownYear
                        className={classes.yearDropdown}
                        // onClick={setYear}
                        onChange={(event) => {
                            setYear(event.target.value)
                        }}
                    ></DropdownYear> */}

                    <DropdownButton
                        title="Year"
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelect}
                    >
                        <Dropdown.Item eventKey="Freshman">
                            Freshman
                        </Dropdown.Item>{' '}
                        <Dropdown.Item eventKey="Sophmore">
                            Sophomore
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Junior">Junior</Dropdown.Item>
                        <Dropdown.Item eventKey="Senior">Senior</Dropdown.Item>
                        <Dropdown.Item eventKey="Graduate">
                            Graduate
                        </Dropdown.Item>
                    </DropdownButton>

                    <h4 style={{ fontSize: '20px', color: 'black' }}>{year}</h4>
                </div>
                <div></div>
                <br></br>
                <div>
                    {/* <div>First Major:</div> */}
                    <DropdownButton
                        title="First Major"
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelectMajor}
                    >
                        {/* <Dropdown.Item eventKey="default">Major</Dropdown.Item> */}
                        <Dropdown.Item eventKey="Accounting">
                            Accounting (ACCT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="African American Studies">
                            African American Studies (AFAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Animation">
                            Animation (ANIM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Mathematics">
                            Applied Mathematics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Physics">
                            Applied Physics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Art History">
                            Art History (ARHS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian and Pacific Studies">
                            Asian and Pacific Studies (ASPA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biochemistry">
                            Biochemistry
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Bioethics">
                            Bioethics (BIOE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biology">
                            Biology (BIOL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Business Administration">
                            Business Administration (BADM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chemistry">
                            Chemistry (CHEM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chicana/o and Latina/o Studies">
                            Chicana/o and Latina/o Studies (CLST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Civil Engineering">
                            Civil Engineering (CIVL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Classics and Archaeology">
                            Classics and Archaeology (CLAR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Communication Studies">
                            Communication Studies (CMST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Computer Science">
                            Computer Science (CMSI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Dance">
                            Dance (DANC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Economics">
                            Economics (ECON)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Electrical Engineering">
                            Electrical Engineering (EECE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="English">
                            English (ENGL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Entrepreneurship">
                            Entrepreneurship (ENTR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Science">
                            Environmental Science (ENVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Studies">
                            Environmental Studies (EVST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film and Television Production">
                            Film and Television Production (PROD)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film, Television, and Media Studies">
                            Film, Television, and Media Studies (FTVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Finance">
                            Finance (FNCE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="French">
                            French (FREN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Health and Human Sciences">
                            Health and Human Sciences (HHSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="History">
                            History (HIST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Humanities">
                            Humanities (HMNT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Information Systems and Business Analytics">
                            Information Systems and Business Analytics (ISBA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Relations">
                            International Relations
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Journalism">
                            Journalism (JOUR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Liberal Studies">
                            Liberal Studies (LBST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Management and Leadership">
                            Management and Leadership (MGMT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Marketing">
                            Marketing (MRKT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mathematics">
                            Mathematics (MATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mechanical Engineering">
                            Mechanical Engineering (MECH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Modern Languages">
                            Modern Languages (MDLG)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Music">
                            Music (MUSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Philosophy">
                            Philosophy (PHIL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Physics">
                            Physics (PHYS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Political Science">
                            Political Science (POLS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Psychology">
                            Psychology (PSYC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Recording Arts">
                            Recording Arts (RECA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Screenwriting">
                            Screenwriting (SCWR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Sociology">
                            Sociology (SOCL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Spanish">
                            Spanish (SPAN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Statistics and Data Science">
                            Statistics and Data Science
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Studio Arts">
                            Studio Arts (ART)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theatre Arts">
                            Theatre Arts (THEA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theological Studies">
                            Theological Studies (THST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Urban Studies">
                            Urban Studies (URBN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Women's and Gender Studies">
                            Women's and Gender Studies (WGST)
                        </Dropdown.Item>
                    </DropdownButton>
                    <h4 style={{ fontSize: '20px', color: 'black' }}>
                        selected {major}
                    </h4>
                    {/* <DropdownMajor
                        className={classes.majorDropdown}
                    ></DropdownMajor> */}
                </div>
                <div></div>
                <br></br>
                <div>
                    {/* <div>Second Major:</div> */}
                    <DropdownButton
                        title="Second Major"
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelectMajor2}
                    >
                        {/* <Dropdown.Item eventKey="default">Major</Dropdown.Item> */}
                        <Dropdown.Item eventKey="Accounting">
                            Accounting (ACCT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="African American Studies">
                            African American Studies (AFAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Animation">
                            Animation (ANIM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Mathematics">
                            Applied Mathematics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Physics">
                            Applied Physics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Art History">
                            Art History (ARHS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian and Pacific Studies">
                            Asian and Pacific Studies (ASPA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biochemistry">
                            Biochemistry
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Bioethics">
                            Bioethics (BIOE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biology">
                            Biology (BIOL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Business Administration">
                            Business Administration (BADM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chemistry">
                            Chemistry (CHEM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chicana/o and Latina/o Studies">
                            Chicana/o and Latina/o Studies (CLST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Civil Engineering">
                            Civil Engineering (CIVL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Classics and Archaeology">
                            Classics and Archaeology (CLAR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Communication Studies">
                            Communication Studies (CMST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Computer Science">
                            Computer Science (CMSI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Dance">
                            Dance (DANC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Economics">
                            Economics (ECON)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Electrical Engineering">
                            Electrical Engineering (EECE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="English">
                            English (ENGL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Entrepreneurship">
                            Entrepreneurship (ENTR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Science">
                            Environmental Science (ENVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Studies">
                            Environmental Studies (EVST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film and Television Production">
                            Film and Television Production (PROD)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film, Television, and Media Studies">
                            Film, Television, and Media Studies (FTVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Finance">
                            Finance (FNCE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="French">
                            French (FREN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Health and Human Sciences">
                            Health and Human Sciences (HHSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="History">
                            History (HIST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Humanities">
                            Humanities (HMNT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Information Systems and Business Analytics">
                            Information Systems and Business Analytics (ISBA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Relations">
                            International Relations
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Journalism">
                            Journalism (JOUR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Liberal Studies">
                            Liberal Studies (LBST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Management and Leadership">
                            Management and Leadership (MGMT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Marketing">
                            Marketing (MRKT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mathematics">
                            Mathematics (MATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mechanical Engineering">
                            Mechanical Engineering (MECH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Modern Languages">
                            Modern Languages (MDLG)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Music">
                            Music (MUSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Philosophy">
                            Philosophy (PHIL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Physics">
                            Physics (PHYS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Political Science">
                            Political Science (POLS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Psychology">
                            Psychology (PSYC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Recording Arts">
                            Recording Arts (RECA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Screenwriting">
                            Screenwriting (SCWR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Sociology">
                            Sociology (SOCL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Spanish">
                            Spanish (SPAN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Statistics and Data Science">
                            Statistics and Data Science
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Studio Arts">
                            Studio Arts (ART)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theatre Arts">
                            Theatre Arts (THEA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theological Studies">
                            Theological Studies (THST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Urban Studies">
                            Urban Studies (URBN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Women's and Gender Studies">
                            Women's and Gender Studies (WGST)
                        </Dropdown.Item>
                    </DropdownButton>
                    <h4 style={{ fontSize: '20px', color: 'black' }}>
                        selected {major2}
                    </h4>
                    {/* <DropdownMajor
                        className={classes.majorDropdown}
                    ></DropdownMajor> */}
                </div>
                <div></div>
                <br></br>
                <div>
                    {/* <div>First Minor:</div> */}
                    <DropdownButton
                        title="First Minor"
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelectMinor}
                    >
                        {/* <Dropdown.Item eventKey="default">Minor</Dropdown.Item> */}
                        <Dropdown.Item eventKey="Accounting">
                            Accounting (ACCT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="African American Studies">
                            African American Studies (AFAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Animation">
                            Animation (ANIM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Mathematics">
                            Applied Mathematics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Art History">
                            Art History (ARHS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian and Pacific Studies">
                            Asian and Pacific Studies (ASPA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian Pacific American Studies">
                            Asian Pacific American Studies (APAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biochemistry">
                            Biochemistry
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Bioethics">
                            Bioethics (BIOE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biology">
                            Biology (BIOL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Business Administration">
                            Business Administration (BADM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Catholic Studies">
                            Catholic Studies (CATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chemistry">
                            Chemistry (CHEM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chicana/o and Latina/o Studies">
                            Chicana/o and Latina/o Studies (CLST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chinese">
                            Chinese (CHIN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Classics and Archaeology">
                            Classics and Archaeology (CLAR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Computer Science">
                            Computer Science (CMSI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Dance">
                            Dance (DANC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Economics">
                            Economics (ECON)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Electrical Engineering">
                            Electrical Engineering (EECE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="English">
                            English (ENGL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Science">
                            Environmental Science (ENVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Studies">
                            Environmental Studies (EVST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film, Television, and Media Studies">
                            Film, Television, and Media Studies (FTVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Finance">
                            Finance (FNCE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="French">
                            French (FREN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="German">
                            German (GRMN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Health and Society">
                            Health and Society (HEAS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="History">
                            History (HIST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Interactive, Gaming, and Immersive Media">
                            Interactive, Gaming, and Immersive Media (IGI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Business">
                            International Business (INBA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Documentary Production">
                            International Documentary Production
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Relations">
                            International Relations
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Irish Studies">
                            Irish Studies (IRST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Italian">
                            Italian (ITAL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Jewish Studies">
                            Jewish Studies (JWST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Journalism">
                            Journalism (JOUR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mathematics">
                            Mathematics (MATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Modern Greek Studies">
                            Modern Greek Studies (MDGK)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Music">
                            Music (MUSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Peace and Justice Studies">
                            Peace and Justice Studies (PJST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Philosophy">
                            Philosophy (PHIL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Physics">
                            Physics (PHYS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Political Science">
                            Political Science (POLS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Psychology">
                            Psychology (PSYC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Public Relations">
                            Public Relations (PRCX)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Screenwriting">
                            Screenwriting (SCWR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Sociology">
                            Sociology (SOCL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Spanish">
                            Spanish (SPAN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Statistics and Data Science">
                            Statistics and Data Science
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Studio Arts">
                            Studio Arts (ART)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theatre Arts">
                            Theatre Arts (THEA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theological Studies">
                            Theological Studies (THST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Urban Studies">
                            Urban Studies (URBN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Women's and Gender Studies">
                            Women's and Gender Studies (WGST)
                        </Dropdown.Item>
                    </DropdownButton>
                    <h4 style={{ fontSize: '20px', color: 'black' }}>
                        selected {minor}
                    </h4>
                    {/* <DropdownMinor
                        className={classes.minorDropdown}
                    ></DropdownMinor> */}
                </div>
                <div></div>
                <br></br>
                <div>
                    {/* <div>Second Minor:</div> */}
                    <DropdownButton
                        title="Second Minor"
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelectMinor2}
                    >
                        {/* <Dropdown.Item eventKey="default">Minor</Dropdown.Item> */}
                        <Dropdown.Item eventKey="Accounting">
                            Accounting (ACCT)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="African American Studies">
                            African American Studies (AFAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Animation">
                            Animation (ANIM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Applied Mathematics">
                            Applied Mathematics
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Art History">
                            Art History (ARHS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian and Pacific Studies">
                            Asian and Pacific Studies (ASPA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Asian Pacific American Studies">
                            Asian Pacific American Studies (APAM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biochemistry">
                            Biochemistry
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Bioethics">
                            Bioethics (BIOE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Biology">
                            Biology (BIOL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Business Administration">
                            Business Administration (BADM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Catholic Studies">
                            Catholic Studies (CATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chemistry">
                            Chemistry (CHEM)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chicana/o and Latina/o Studies">
                            Chicana/o and Latina/o Studies (CLST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Chinese">
                            Chinese (CHIN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Classics and Archaeology">
                            Classics and Archaeology (CLAR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Computer Science">
                            Computer Science (CMSI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Dance">
                            Dance (DANC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Economics">
                            Economics (ECON)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Electrical Engineering">
                            Electrical Engineering (EECE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="English">
                            English (ENGL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Science">
                            Environmental Science (ENVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Environmental Studies">
                            Environmental Studies (EVST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Film, Television, and Media Studies">
                            Film, Television, and Media Studies (FTVS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Finance">
                            Finance (FNCE)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="French">
                            French (FREN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="German">
                            German (GRMN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Health and Society">
                            Health and Society (HEAS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="History">
                            History (HIST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Interactive, Gaming, and Immersive Media">
                            Interactive, Gaming, and Immersive Media (IGI)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Business">
                            International Business (INBA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Documentary Production">
                            International Documentary Production
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="International Relations">
                            International Relations
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Irish Studies">
                            Irish Studies (IRST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Italian">
                            Italian (ITAL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Jewish Studies">
                            Jewish Studies (JWST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Journalism">
                            Journalism (JOUR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Mathematics">
                            Mathematics (MATH)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Modern Greek Studies">
                            Modern Greek Studies (MDGK)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Music">
                            Music (MUSC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Peace and Justice Studies">
                            Peace and Justice Studies (PJST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Philosophy">
                            Philosophy (PHIL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Physics">
                            Physics (PHYS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Political Science">
                            Political Science (POLS)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Psychology">
                            Psychology (PSYC)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Public Relations">
                            Public Relations (PRCX)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Screenwriting">
                            Screenwriting (SCWR)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Sociology">
                            Sociology (SOCL)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Spanish">
                            Spanish (SPAN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Statistics and Data Science">
                            Statistics and Data Science
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Studio Arts">
                            Studio Arts (ART)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theatre Arts">
                            Theatre Arts (THEA)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Theological Studies">
                            Theological Studies (THST)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Urban Studies">
                            Urban Studies (URBN)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Women's and Gender Studies">
                            Women's and Gender Studies (WGST)
                        </Dropdown.Item>
                    </DropdownButton>
                    <h4 style={{ fontSize: '20px', color: 'black' }}>
                        selected {minor2}
                    </h4>
                    {/* <DropdownMinor
                        className={classes.minorDropdown}
                    ></DropdownMinor> */}
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
                <Uploadfile></Uploadfile>
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
