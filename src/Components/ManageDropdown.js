import React, { useState, useEffect, useMemo } from 'react'
import { db } from '../firebase'
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemSecondaryAction } from '@material-ui/core'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import ConfirmationDialog from './ConfirmationDialog'

export default function ManageDropdown({ project, group }) {
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [acceptConfirmation, setAcceptConfirmation] = useState()

  const handleClick = () => {
    setOpen(!open);
  }

  const handleClickOpenAccept = () => {
    setDialogOpen(true)
    setAcceptConfirmation(true)
  }

  const handleClickOpenReject = () => {
    setDialogOpen(true)
    setAcceptConfirmation(false)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  // const refreshDialogOpen = () => {
  //   return true
  // }

  const sendEmail = (e, member) => {
    e.preventDefault()
    window.location = 'mailto:example@example.com'
  }

  const usersCollectionRef = useMemo(() => collection(db, 'users'), [])

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef)
    const selected = (data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    setUsers(selected)
  }

  const getUser = (id) => {
    return users.filter((user) => user.key === id)[0]
  }

  let editedGroupMembers = null, 
      editedApplicants = null, 
      editedRejected = null;

  useEffect(() => {
    setGroupMembers(project?.groupMembers)
    console.log(groupMembers)
    setApplicants(project?.applicants)
    setRejected(project?.rejected)
    // refreshDialogOpen()
    // editedGroupMembers = [...groupMembers,...[]]
    // editedApplicants = [...applicants]
    // editedRejected = [...rejected]
  })
  
  const moveMember = (member, from, to) => {
    if (!from.includes(member)) return
    from = from.filter(m => m !== member)
    to.add(member)
  }

  const sendIcon = () => {
    return (
      <Tooltip title="Contact">
        <IconButton onClick={(e) => sendEmail(e)}>
            <SendIcon color='primary'/>
        </IconButton>
      </Tooltip>
    )
  }

  const acceptIcon = () => {
    return (
      <Tooltip title="Accept Applicant">
        <IconButton onClick={handleClickOpenAccept}>
          <CheckIcon color='success'/>
        </IconButton>
      </Tooltip>
    )
  }

  const rejectIcon = () => {
    return (
      <Tooltip title="Reject Applicant">
        <IconButton onClick={handleClickOpenReject}>
          <CloseIcon color='warning'/>
        </IconButton>     
      </Tooltip>
    )
  }

  const conditionalIcons = (group) => {
      if (group === 'Past Applicants') {
        return (<div>{sendIcon()}{acceptIcon()}</div>)
      }
      if (group === 'Applicants') {
        return (<div>{sendIcon()}{acceptIcon()}{rejectIcon()}</div>)
      }
      return (<div>{sendIcon()}</div>)
  }

  const memberListItem = (member) => {
    return (
      <ListItem alignItems='flex-start'>
        <Tooltip title="Visit profile">    
          <Link to={`/editproject/${member}`}>
            <ListItemAvatar>
              <Avatar src={`${process.env.PUBLIC_URL}/projectImages/user.png`} />
            </ListItemAvatar>
          </Link>
        </Tooltip>
        <ListItemText primary={`${member.firstName} ${member.lastName}`} secondary={`Pronouns ${member.pronouns}`} style={{ marginTop: '30' }}/>
        {conditionalIcons(group)}
      </ListItem>
    )
  }

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
        {[1,2,3].map((value) => {
          return(
            <div key={value}>
              {memberListItem(value)}
            </div>
          )
        })}
        <ConfirmationDialog onClickState={dialogOpen} onClose={handleClose} accept={acceptConfirmation} member={'John'} project={project.tite}/>
        </List>
      </Collapse>
    </List>
    </div>
  );
}