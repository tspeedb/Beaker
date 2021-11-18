import Layout from '../Components/Layout'
import Sidebar from '../Components/Sidebar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'

function BookemarkedProjects() {
    return (
        <Layout>
            <Sidebar></Sidebar>
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                    {' '}
                    bookmarked projects{' '}
                </h1>
            </div>
        </Layout>
    )
}

export default BookemarkedProjects
