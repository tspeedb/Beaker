import Layout from '../Components/Layout'
import Side from '../Components/Side'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { ListItemButton, ListItemText, Grid } from '@mui/material'
import Card from '@material-ui/core/Card'
import React, { useState, useEffect } from 'react'
import ProjectCards from '../Components/ProjectCards'
import sidebaritems from '../sidebaritems'

function BookmarkedProjects({ projects, sidebaritems }) {
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
            <Side sidebaritems={sidebaritems}>
                <div>
                    <h1
                        style={{
                            color: 'rgba(16, 127, 183, 1)',
                            paddingLeft: '100px',
                            fontWeight: 'lighter',
                            textAlign: 'center',
                            fontSize: '40px',
                            paddingBottom: '20px',
                        }}
                    >
                        {' '}
                        Bookmarked Projects{' '}
                    </h1>
                    <ProjectCards projects={bookmarks} />
                </div>
            </Side>
        </Layout>
    )
}

export default BookmarkedProjects
