import React from 'react'
import ManageDropdown from './ManageDropdown';

export default function ManageMembers({ project }) {
  return (
    <div style={{
        paddingLeft: 5, 
        paddingTop: 10
    }} className='memberslist' >
        <ManageDropdown project={project} groupUse={"Members"}/>
        <ManageDropdown project={project} groupUse={"Applicants"}/>
        <ManageDropdown project={project} groupUse={"Past Applicants"}/>
    </div>
  );
}