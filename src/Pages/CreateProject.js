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
import { db, storage } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { storage } from 'firebase'
// import { storage } from './firebase/firebase' // It would be best to remove this import as storage is alreay imported above [AM]
// import DropdownMajor from '../Components/dropdownMajor'
// import DropdownMinor from '../Components/dropdownMinor'
import Uploadfile from '../Components/UploadFile'
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

function CreateProject({ setProjects }) {
    const [projectName, setProjectName] = useState('')
    const [desc, setDesc] = useState('')
    const [reqMajor, setReqMajor] = useState('')
    const [reqMinor, setReqMinor] = useState('')
    const [reqYear, setReqYear] = useState('')
    const [softskills, setSoftskills] = useState('')
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState(
        `${process.env.PUBLIC_URL}/projectImages/user.png`
    )

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
            major: reqMajor,
            minor: reqMinor,
            year: reqYear,
            softskills: softskills,
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
                <h1 className="left-text-info" id="text">
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
                <input
                    type="text"
                    className="project-desc "
                    placeholder="Project Description"
                    onChange={(event) => {
                        setDesc(event.target.value)
                    }}
                />
                <input
                    type="text"
                    className="project-major "
                    placeholder="Needed Major(s)"
                    onChange={(event) => {
                        setReqMajor(event.target.value)
                    }}
                />
                <input
                    type="text"
                    className="project-major "
                    placeholder="Needed Major(s)"
                    onChange={(event) => {
                        setReqMajor(event.target.value)
                    }}
                />
                <div></div>
                <br></br>
            </div>
        </div>
    )
}

export default CreateProject
