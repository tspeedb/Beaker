import React, { useState, useEffect } from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'
import projects from '../projectsdata'

function LearnMore({ match }) {
    const [project, setProject] = useState({})
    const id = Number(match.params.projectId)

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = projects.filter((project, i) => i === id)[0]
        setProject(selected)
    }, [id])

    return <div>{project.title}</div>
}

export default LearnMore
