import React from 'react'
import ManageDropdown from './ManageDropdown';

export default function ManageMembers({ match }) {

  return (
    <div style={{
        paddingLeft: 5, 
        paddingTop: 10
    }} className='memberslist' >
        <ManageDropdown match={match} group="Members"/>
        <ManageDropdown match={match} group="Applicants"/>
        <ManageDropdown match={match} group="Past Applicants"/>
    </div>
  );
}