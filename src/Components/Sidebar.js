import React from 'react'
import '../Styles/Sidebar.css'
import sidebaritems from '../sidebaritems'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
            {sidebaritems.map((item, index) => (
                <Link to={item.route} key={index}>
                    <div>{item.display_name}</div>
                </Link>
            ))}
        </div>
    )
}

export default Sidebar
