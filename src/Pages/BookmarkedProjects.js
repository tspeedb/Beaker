import Layout from '../Components/Layout'
import Side from '../Components/Side'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'

function BookemarkedProjects() {
    return (
        <Layout>
            <Side>
                <div>
                    <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                        {' '}
                        bookmarked projects{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default BookemarkedProjects
