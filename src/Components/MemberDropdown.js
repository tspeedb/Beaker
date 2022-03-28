import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemSecondaryAction } from '@material-ui/core'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'

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
            <ListItemSecondaryAction>
              {/* <IconButton>
                <AccountBoxIcon/>
              </IconButton> */}
              <IconButton>
                <SendIcon color='primary'/>
              </IconButton>
              <IconButton>
                <CheckIcon color='success'/>
              </IconButton>
              <IconButton>
                <CloseIcon color='warning'/>
              </IconButton>
            </ListItemSecondaryAction>

          )
      }
      if (group == "Past Applicants") {
        return (
            <ListItemSecondaryAction>
              {/* <IconButton>
                <AccountBoxIcon/>
              </IconButton> */}
              <IconButton>
                <SendIcon color='primary'/>
              </IconButton>
              <IconButton>
                <CheckIcon color='success'/>
              </IconButton>
            </ListItemSecondaryAction>

          )
      }
      return (
        <ListItemSecondaryAction>
            {/* <IconButton>
                <AccountBoxIcon/>
            </IconButton> */}
            <IconButton>
                <SendIcon color='primary'/>
            </IconButton>
        </ListItemSecondaryAction>
      )
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
      <ListItem alignItems='flex-start'>
        <Link to={`/editproject/KUHje5dmmEPylm9RPeKM`}>
          <ListItemAvatar>
            <Avatar src={`${process.env.PUBLIC_URL}/projectImages/user.png`} />
          </ListItemAvatar>
        </Link>
        <ListItemText primary={'Member ' + member} secondary={'Pronouns'} style={{ marginTop: '30' }}/>
        {applicantOptions(group)}
      </ListItem>
    </List>
    </div>
  );
}