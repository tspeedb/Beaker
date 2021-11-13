import React from 'react'
import '../Styles/Sidebar.css'
import sidebaritems from '../sidebaritems'
import { Link } from 'react-router-dom'

const SidebarItem = (props) => {
    const active = props.active ? 'active' : ''
    return (
        <div className="sidebar_item">
            <div className={`sidebar_item-inner${active}`}>
                <i className={props.icon}> </i>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

function Sidebar(props) {
    // const activeItem = sidebaritems.findIndex(
    //     (item) => item.route === this.props.location
    // )
    return (
        <div className="sidebar">
            {sidebaritems.map((item, index) => (
                <Link className="link" to={item.route} key={index}>
                    <SidebarItem
                        title={item.display_name}
                        icon={item.icon}
                        // active={index === activeItem}
                    />
                </Link>
            ))}
        </div>
    )
}

export default Sidebar
