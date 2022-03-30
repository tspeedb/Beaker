import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MemberDropdown from "./MemberDropdown"

export default function ManageDropdown({ match, group }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{
        paddingLeft: 100,
    }} className='memberslist' >
    <List
      sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`Manage ${group}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          return(
            <div key={value}>
              <MemberDropdown member={value} group={group}/>
            </div>
          )
        })}
        </List>
      </Collapse>
    </List>
    </div>
  );
}