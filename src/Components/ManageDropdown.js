import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MemberDropdown from "./MemberDropdown"

export default function ManageDropdown({ members, group }) {
  const [checked, setChecked] = React.useState([1]);
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState("");

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  const handleClick = () => {
    setOpen(!open);
  };

  // const handleClickAway = () => {
  //   setOpen(false);
  // };

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