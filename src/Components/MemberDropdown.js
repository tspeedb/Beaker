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
import Tooltip from '@mui/material/Tooltip';

export default function Member({ member, group }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const applicantOptions = (group) => {
      if (group == "Applicants") {
        return (
            <ListItemSecondaryAction>
              <Tooltip title="Contact">
                <IconButton>
                  <SendIcon color='primary'/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Accept Applicant">
                <IconButton>
                  <CheckIcon color='success'/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject Applicant">
              <IconButton>
                <CloseIcon color='warning'/>
              </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>

          )
      }
      if (group == "Past Applicants") {
        return (
            <ListItemSecondaryAction>
              <Tooltip title="Contact">
                <IconButton>
                  <SendIcon color='primary'/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Accept Applicant">
                <IconButton>
                  <CheckIcon color='success'/>
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>

          )
      }
      return (
        <ListItemSecondaryAction>
            <Tooltip title="Contact">
                <IconButton>
                  <SendIcon color='primary'/>
                </IconButton>
            </Tooltip>
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
      <Tooltip title="Visit profile">    
          <Link to={`/editproject/KUHje5dmmEPylm9RPeKM`}>
            <ListItemAvatar>
              <Avatar src={`${process.env.PUBLIC_URL}/projectImages/user.png`} />
            </ListItemAvatar>
          </Link>
        </Tooltip>
        <ListItemText primary={'Member ' + member} secondary={'Pronouns'} style={{ marginTop: '30' }}/>
        {applicantOptions(group)}
      </ListItem>
    </List>
    </div>
  );
}