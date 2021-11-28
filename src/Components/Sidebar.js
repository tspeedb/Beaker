import React from 'react'
import '../Styles/Sidebar.css'
import sidebaritems from '../sidebaritems'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    // const activeItem = sidebaritems.findIndex(
    //     (item) => item.route === this.props.location
    // )
    return (
        <>
            <div id="sidebar">
                {sidebaritems.map((item, index) => {
                    return (
                        <li key={index} id={item.cName}>
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
