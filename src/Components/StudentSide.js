import React from 'react'

import StudentSidebar from './StudentSidebar'

const Layout = ({ children }) => {
    return (
        <>
            <StudentSidebar />

            <div>{children}</div>
        </>
    )
}

export default Layout
