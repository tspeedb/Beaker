import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Member({ member, group }) {
  const [checked, setChecked] = React.useState([1]);
  const [open, setOpen] = React.useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const applicantOptions = (group) => {
      if (group == "Applicants") {
        return (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                <ListItem key='View Profile' style={{paddingLeft: 30}}>Reject Application</ListItem>
                <ListItem key='View Profile' style={{paddingLeft: 30}}>Accept Application</ListItem>
                </List>
            </Collapse>
          )
      }
  }

  return (
    <div style={{
        paddingLeft: 50,
    }} className='memberslist' >
    <List
      sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        {/* <ListItemIcon> */}
          {/* <InboxIcon /> */}
        {/* </ListItemIcon> */}
        <ListItemText primary={'Member ' + member} />
      </ListItemButton>
      {applicantOptions(group)}
    </List>
    </div>
  );
}