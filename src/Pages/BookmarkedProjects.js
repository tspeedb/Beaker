import Layout from '../Components/Layout'
import Side from '../Components/Side'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'
import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'

function BookmarkedProjects({ projects }) {
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        //fetch data from server
        // fetchprojects();
        const bookmarked = projects.filter(
            (project) => project.type === 'bookmarked'
        )
        setBookmarks(bookmarked)
    }, [projects])
    return (
        <Layout>
            <Side>
                <div>
                    <h1 style={{ textAlign: 'center', fontSize: '40px' }}>
                        {' '}
                        bookmarked projects{' '}
                    </h1>
                    <ProjectCards projects={bookmarks} />
                </div>
            </Side>
        </Layout>
    )
}

export default BookmarkedProjects
