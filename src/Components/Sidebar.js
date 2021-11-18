import React from 'react'
import '../Styles/Sidebar.css'
import sidebaritems from '../sidebaritems'
import { Link } from 'react-router-dom'

function Sidebar() {
    // const activeItem = sidebaritems.findIndex(
    //     (item) => item.route === this.props.location
    // )
    return (
        <>
            <div className="sidebar">
                {sidebaritems.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.route}>
                                <span> {item.display_name}</span>
                            </Link>
                        </li>
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar
