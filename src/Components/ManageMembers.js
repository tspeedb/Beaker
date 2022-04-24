import React from 'react'
import ManageDropdown from './ManageDropdown';

export default function ManageMembers({ project, id }) {
  return (
    <div style={{
        paddingLeft: 5, 
        paddingTop: 10
    }} className='memberslist' >
        <ManageDropdown project={project} id={id} groupUse={"Members"}/>
        <ManageDropdown project={project} id={id} groupUse={"Applicants"}/>
        <ManageDropdown project={project} id={id} groupUse={"Past Applicants"}/>
    </div>
  );
}