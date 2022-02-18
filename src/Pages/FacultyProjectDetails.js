import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@material-ui/core/Box';

import Layout from '../Components/Layout'
import ManageMembers from '../Components/ManageMembers'
//import { Icon } from '@mui/material'

function ProjectDetails({ match, projects, members }) {
    const [project, setProject] = useState({})
    const id = match.params.projectId

    useEffect(() => {
        //send the network request to retrieve data for this project
        const selected = projects.filter((project) => project.key === id)[0]
        setProject(selected)
        console.log(selected)
    }, [id, projects])

    const checkIncentives = (project) => {
        let comp = ""
        if (!project.isPaid) comp += "Not Paid \n"
        return comp;
    }

    function incentiveComp(project) {
        let comp = checkIncentives(project)
        let heading = ""
        if (comp.length != 0) {
            heading = 'Incentives'
            return ( 
                <div>
                    <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                            {heading}
                    </div>
                    <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px', paddingBottom: '5%' }}>
                        {checkIncentives(project)}
                    </div>
                </div>
            );
        }
    }

    return (
        <Layout>
            <div>
                <div style={{ margin: '20px' }}>
                    <Box display='flex' flexGrow={1} >
                        <Link to="/projectspage">
                                <ArrowBackIosIcon style={{ color: 'black', paddingLeft: '10'}}></ArrowBackIosIcon>
                        </Link>
                        <Link to={`/editproject/${id}`}>
                            <EditIcon style={{ color: 'black', marginRight: 'auto'}}></EditIcon>
                        </Link>
                    </Box>
                    
                </div>
                {project && (
                    <div className="about-container">
                        <div className="column-left details">
                            {' '}
                            <img
                                src={`${process.env.PUBLIC_URL}/projectImages/${project.image}`}
                                alt="project.title"
                                style={{
                                    width: 400,
                                    height: 400,
                                    paddingTop: '0%',
                                    borderRadius: '5px',
                                    textShadow: '2px 2px 5px',
                                }}
                            />{' '}
                            <ManageMembers/>
                        </div>
                        <div className="column-right details">
                            <div style={{ fontSize: '50px' }}>
                                {project.title}
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                {project.description}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Requested Major(s)
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                {project.description}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Preferred Years
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                <Button variant="contained" size="small">{project.year}</Button>
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Soft Skills
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                Some placeholder soft skills.
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Project Timeline
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                1 Semester
                            </div>
                            { incentiveComp(project) }
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default ProjectDetails
