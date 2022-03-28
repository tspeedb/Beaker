import Layout from '../Components/Layout'
import Side from '../Components/Side'
import sidebaritems from '../sidebaritems'
import studsidebaritems from '../studsidebaritems'

import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    largeCards: {
        // paddingLeft: '10px',
        // paddingRight: '10px',
        height: '10rem',
        width: '10rem',
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
        zIndex: '-1',
    },
    smallerCards: {
        margin: '10px',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
    gridContainer: {
        // paddingLeft: '20rem',
    },
})

function BookmarkedMembers() {
    return (
        <Layout>
            <Side
                sidebaritems={sidebaritems}
                studsidebaritems={studsidebaritems}
            >
                <div>
                    <h1
                        style={{
                            color: 'rgba(16, 127, 183, 1)',

                            fontWeight: 'lighter',

                            paddingLeft: '100px',
                            textAlign: 'center',
                            fontSize: '40px',
                        }}
                    >
                        {' '}
                        bookmarked members
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default BookmarkedMembers
