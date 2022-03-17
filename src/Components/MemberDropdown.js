import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function Member({ member, group }) {
  const [checked, setChecked] = useState([1]);
  const [open, setOpen] = useState(false);

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

  const applicantOptions = (group) => {
      if (group == "Applicants") {
        return (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                  <ListItem key='Reject' style={{paddingLeft: 30}}>Reject Application</ListItem>
                  <ListItem key='Accept' style={{paddingLeft: 30}}>Accept Application</ListItem>
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