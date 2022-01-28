import React, { useState, useEffect, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Styles/Profile.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import 'firebase/firestore'
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

function FacultyStaffProfile({ setFSMembers }) {
    const [title, setTitle] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [nickname, setNickname] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [department, setDepartment] = useState('')
    const [labDesc, setLabDesc] = useState('')
    const [link, setPortfolioLink] = useState(6)
    const [url, setURL] = useState('')
    const [facultyStaff, setFacultyStaff] = useState([])
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

    const handleSelect = (e) => {
        console.log(e)
        setTitle(e)
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
            first: firstName,
            middle: middleName,
            last: lastName,
            nickname: nickname,
            pronouns: pronouns,
            department: department,
            labDesc: labDesc,
            portfolioLink: link,
            image: imageAsUrl,
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
                        src={imageAsUrl}
                        onClick={(e) => openWidget(e, widget)}
                    />
                </div>
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="fs-title"
                    placeholder="Title (Ex: Professor)"
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <input
                    //it would probably be best to get rid of any commented out code to keep the code more clean (MS)
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
                    placeholder="Preferred way to be addressed"
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
                <input
                    type="text"
                    className="department"
                    placeholder="Department"
                    onChange={(event) => {
                        setDepartment(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <label>Lab Description:</label>
                <br></br>
                <textarea
                    className="lab-description"
                    onChange={(event) => {
                        setLabDesc(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
                <label className="resume">Upload CV or Resume</label>
                <div></div>
                <br></br>
                {/* allow users to upload pdf of resume here */}
                <div></div>
                <br></br>
                <label className="resume">Link to Portfolio/Website</label>
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
                            className="done-btn1"
                            size="large"
                            color="primary"
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
