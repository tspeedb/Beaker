import React from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
} from '@material-ui/core'
import { AirlineSeatLegroomReducedRounded } from '@mui/icons-material'
import { TableSortLabel } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1200,
        justifyContent: 'center',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    avatar: {
        height: '50px',
        width: '50px',
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.light,
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
}))

// let USERS = [],
//     STATUSES = ['Active', 'Pending', 'Blocked']
// for (let i = 0; i < 14; i++) {
//     USERS[i] = {
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber(),
//         jobTitle: faker.name.jobTitle(),
//         company: faker.company.companyName(),
//         joinDate: faker.date.past().toLocaleDateString('en-US'),
//         status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
//     }
// }

function ProjectTable({ projects }) {
    const classes = useStyles()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>
                            Title & Description
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                            Desired Major(s)
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                            Desired Years
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                            Incentives
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                            Owner
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((project) => (
                            <TableRow key={project.title}>
                                <TableCell>
                                    <Link
                                        className={classes.links}
                                        to={`/aboutproject/${project.key}`}
                                    >
                                        <Grid container>
                                            <Grid item lg={2}>
                                                <Avatar
                                                    alt={project.title}
                                                    // src="."
                                                    src={project.image}
                                                    className={classes.avatar}
                                                />
                                            </Grid>
                                            <Grid item lg={10}>
                                                <Typography
                                                    className={classes.name}
                                                >
                                                    {project.title}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {project.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                </TableCell>
                                <TableCell>{project.major}</TableCell>
                                <TableCell>
                                    <Typography
                                        color="primary"
                                        variant="subtitle2"
                                    >
                                        {project.year}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {project.company}
                                    </Typography>
                                </TableCell>

                                <TableCell>{project.incentives}</TableCell>

                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                (project.status === 'Active' &&
                                                    'green') ||
                                                (project.status === 'Pending' &&
                                                    'blue') ||
                                                (project.status === 'Blocked' &&
                                                    'orange'),
                                        }}
                                    >
                                        {project.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={projects.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default ProjectTable
