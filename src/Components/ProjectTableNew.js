import React from 'react'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'

function ProjectTableNew({ projects }) {
    const columns = [
        { title: 'Project Title & Description', field: 'title' },
        { title: 'Desired Major', field: 'major' },
        { title: 'Desired Year', field: 'year' },
        { title: 'Incentives', field: 'incentives' },
        { title: 'Owner' },
    ]

    return (
        <div>
            <MaterialTable
                actions={[
                    (project) => ({
                        icon: () => (
                            <Link to={`/aboutproject/${project.key}`}></Link>
                        ),
                    }),
                ]}
                title="Projects"
                data={projects}
                columns={columns}
            />
        </div>
    )
}

export default ProjectTableNew
