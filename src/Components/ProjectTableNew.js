import React from 'react'
import MaterialTable from 'material-table'
import 'firebase/firestore'
import { Link } from 'react-router-dom'

function ProjectTableNew({ projects }) {
    const columns = [
        {
            field: 'image',
            render: (project) => (
                <Link to={`/aboutproject/${project.key}`}>
                    <img
                        alt="project"
                        src={project.image}
                        style={{ width: 50 }}
                    />{' '}
                </Link>
            ),
        },
        { title: 'Project Title', field: 'title' },
        { title: 'Description', field: 'desc' },
        { title: 'Desired Major', field: 'major' },
        { title: 'Desired Year', field: 'year' },
        { title: 'Incentives', field: 'incentives' },
        { title: 'Status', field: 'status' },
        { title: 'Owner' },
    ]

    return (
        <div>
            <MaterialTable
                title="Find your match!"
                data={projects}
                columns={columns}
            />
        </div>
    )
}

export default ProjectTableNew
