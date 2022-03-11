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
    sorter: {
        margin: 0,
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
    const [order, setOrder] = React.useState()
    const [orderBy, setOrderBy] = React.useState()
    const [filter, setFilter] = React.useState(true)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const recordsAfterPagingAndSorting = () => {
        return stableSort(getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            (page + 1) * rowsPerPage
        )
    }

    const handleSort = (cellId) => {
        const isAsc = orderBy === cellId && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(cellId)
    }

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
                {projects.map((project) => (
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key={project.id}
                                className={classes.tableHeaderCell}
                            >
                                <TableSortLabel
                                    active={orderBy === project.id}
                                    direction={
                                        orderBy === project.id ? order : 'asc'
                                    }
                                    onClick={() => {
                                        handleSort(project.title)
                                    }}
                                >
                                    Title & Description
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={classes.tableHeaderCell}>
                                <TableSortLabel
                                    direction={
                                        orderBy === project.major
                                            ? order
                                            : 'asc'
                                    }
                                    onClick={() => {
                                        handleSort(project.major)
                                    }}
                                >
                                    Desired Major(s)
                                </TableSortLabel>
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
                ))}

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
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map((el) => el[0])
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }
    return {
        recordsAfterPagingAndSorting,
    }
}

export default ProjectTable
