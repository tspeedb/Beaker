import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import '../Styles/LearnMore.css'
import Layout from '../Components/Layout'
import ManageMembers from '../Components/ManageMembers'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import { Typography } from '@mui/material';

function ProjectDetails({ match, projects }) {
    const [project, setProject] = useState({})
    const [id, setId] = useState(match.params.projectId)
    const projectCollectionRef = doc(db, 'projects', id)

    const getProject = async () => {
        const data = await getDoc(projectCollectionRef)
        const selected = data.data()
        setProject(selected)
    }

    useEffect(() => {
        getProject() 
    }, [id, projects])

    const incentiveComp = (project) => {
        let heading = ""
        if (project?.incentives?.length > 0) {
            heading = 'Incentives'
            return ( 
                <div>
                    <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                            {heading}
                    </div>
                    <div style={{ maxWidth: '600px', paddingTop: '5px', paddingBottom: '5%' }}>
                        {project?.incentives?.map((incentive) => ( <Chip key={incentive} label={incentive} style={{margin: '1px', fontSize: '15px'}}/>))}
                    </div>
                </div>
            );
        }
    }

    const statusComp = (project) => {
        let color
        switch(project.status) {
            case 'Open': color = 'primary'; break;
            case 'Closed': color = 'secondary'; break;
            case 'Completed': color = 'default'; break;
            default: color = 'primary'; break;
        }
        return (
            <div>
                <Chip label={project.status} variant='outlined' size='small' color={color} style={{marginLeft: '20px'}}/>
            </div>
        )
    }

    return (
        <Layout>
            <div>
                <div style={{ margin: '20px' }}>
                    <Link to="/projectspage">
                        <ArrowBackIosIcon style={{ color: 'black', paddingLeft: '10'}}></ArrowBackIosIcon>
                    </Link>
                    <div
                        style={{
                            justifyContent: 'end',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '-30px'
                        }}
                        >
                            <Link to={`/editproject/${id}`}>
                                <EditIcon style={{ color: 'black', marginRight: 'auto'}}></EditIcon>
                            </Link>
                        </div>
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
                            <ManageMembers project={project} id={id}/>
                        </div>
                        <div className="column-right details">
                            <div style={{ fontSize: '50px' }}>
                                <Box display='flex' flexGrow={1} >
                                {project.title} 
                                {statusComp(project)}
                                </Box>
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px', marginLeft: '5px' }}>
                                {project.description}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Requested Major(s)
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                                {project?.major?.map((major) => ( <Chip key={major} label={major} style={{margin: '1px', fontSize: '15px'}}/>))}
                            </div>
                            <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                                Preferred Years
                            </div>
                            <div style={{ fontSize: '15px', maxWidth: '600px', paddingTop: '5px' }}>
                            {project?.year?.map((years) => ( <Chip key={years} label={years} style={{margin: '1px', fontSize: '15px'}}/>))}
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