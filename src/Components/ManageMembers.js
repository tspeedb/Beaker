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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function ManageMembers() {
  const [checked, setChecked] = React.useState([1]);
  const [open, setOpen] = React.useState(true);

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

  return (
    <div style={{
        paddingLeft: 100,
    }} className='memberslist' >
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Manage Project Members and Applicants
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Members" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem
                key={value}
                //secondaryAction={
                // <Checkbox
                //     edge="end"
                //     onChange={handleToggle(value)}
                //     checked={checked.indexOf(value) !== -1}
                //     inputProps={{ 'aria-labelledby': labelId }}
                // />
                //}
                //disablePadding
            >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Sample Member ${value + 1}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Applicants" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem
                key={value}
                // secondaryAction={
                // <Checkbox
                //     edge="end"
                //     onChange={handleToggle(value)}
                //     checked={checked.indexOf(value) !== -1}
                //     inputProps={{ 'aria-labelledby': labelId }}
                // />
                // }
                // disablePadding
            >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Sample Applicant ${value + 1}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
      </Collapse>
    </List>
    </div>
  );
}