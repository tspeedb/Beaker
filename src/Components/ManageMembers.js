import React from 'react'
import ManageDropdown from './ManageDropdown';

export default function ManageMembers({ project }) {
  return (
    <div style={{
        paddingLeft: 5, 
        paddingTop: 10
    }} className='memberslist' >
        <ManageDropdown project={project} group="Members"/>
        <ManageDropdown project={project} group="Applicants"/>
        <ManageDropdown project={project} group="Past Applicants"/>
    </div>
  );
}