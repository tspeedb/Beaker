import React from 'react'
// import sidebaritems from '../sidebaritems'
import Sidebar from './Sidebar'

const Side = ({ children, sidebaritems }) => {
    return (
        <>
            <Sidebar sidebaritems={sidebaritems} />

            <div>{children}</div>
        </>
    )
}

export default Side
