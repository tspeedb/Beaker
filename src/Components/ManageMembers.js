import React from 'react'
import ManageDropdown from './ManageDropdown';

export default function ManageMembers() {
  return (
    <div style={{
        paddingLeft: 5, 
        paddingTop: 10
    }} className='memberslist' >
        <ManageDropdown group="Members"/>
        <ManageDropdown group="Applicants"/>
        <ManageDropdown group="Past Applicants"/>
    </div>
  );
}