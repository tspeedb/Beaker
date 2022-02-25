import React, { useState, useEffect } from 'react'
import '../Styles/LearnMore.css'
import Layout from '../Components/Layout'
import ManageMembers from '../Components/ManageMembers'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip';;


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

    function incentiveComp(project) {
        let heading = ""
        if (project?.incentives?.length > 0) {
            heading = 'Incentives'
            return ( 
                <div>
                    <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                            {heading}
                    </div>
                    <div style={{ maxWidth: '600px', paddingTop: '5px', paddingBottom: '5%' }}>
                        {project.incentives?.map((major) => ( <Chip label={major} style={{margin: '1px', fontSize: '15px'}}/>))}
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
                                src={project.image}
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
                                {project.major?.map((major) => ( <Chip label={major} style={{margin: '1px', fontSize: '15px'}}/>))}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Preferred Years
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                            {project.year?.map((major) => ( <Chip label={major} style={{margin: '1px', fontSize: '15px'}}/>))}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Soft Skills
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                {project.softskills}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Project Timeline
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                {project.timeline}
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
