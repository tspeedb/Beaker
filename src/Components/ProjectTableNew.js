import React from 'react'
import MaterialTable from 'material-table'
import 'firebase/firestore'
import { Link } from 'react-router-dom'
import { TablePagination } from '@material-ui/core'

function ProjectTableNew({ projects }) {
    const [firstLoad, setFirstLoad] = React.useState()
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
        { title: 'Title', field: 'title' },
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
                components={{
                    Pagination: (props) => (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[5, 10, 30, 40, 50]}
                        />
                    ),
                }}
                options={{
                    headerStyle: {
                        fontWeight: 'bold',
                        backgroundColor: '#01579b',
                        color: '#FFF',
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                    exportButton: true,
                }}
                detailPanel={(project) => {
                    return (
                        <div
                            style={{
                                padding: 10,
                                fontSize: 17,
                                textAlign: 'center',
                                color: 'grey',
                                backgroundColor: 'white',
                            }}
                        >
                            {project.description}
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default ProjectTableNew
