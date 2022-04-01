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
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ManageDropdown({ project, group }) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])
  const [users, setUsers] = useState([])
  // const [acceptDialog, setAcceptDialog] = useState(true)

  const handleClick = () => {
    setOpen(!open);
  }

  const handleClickOpen = (accept) => {
    setDialogOpen(true)
    // setAcceptDialog(accept)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

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
    // editedGroupMembers = [...groupMembers,...[]]
    // editedApplicants = [...applicants]
    // editedRejected = [...rejected]
  })
  
  const moveMember = (member, from, to) => {
    if (!from.includes(member)) return
    from = from.filter(m => m !== member)
    to.add(member)
  }

  const title = (accept, member, project) => {
    let action = (accept) ? 'accept' : 'reject'
    return `Would you like to ${action} ${member} for the project ${project}?`
  }

  const text = (accept, member, project) => {
    let action = (accept) ? 'Accepting' : 'Rejecting'
    let consequence = (accept) ? 'add them to' : 'remove them from'
    return `${action} ${member} will ${consequence} the project ${project}.`
  }

  const dialogConfirmation = (accept, member, project) => {
    return (
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title(accept, member, project)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text(accept, member, project)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>Accept</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const applicantOptions = (group) => {
      if (group == "Applicants") {
        return (
            <ListItemSecondaryAction>
              <Tooltip title="Contact">
                  <IconButton>
                    <Link onClick={(e) => sendEmail(e)}>
                      <SendIcon color='primary'/>
                    </Link>
                  </IconButton>
              </Tooltip>
              <Tooltip title="Accept Applicant">
                <IconButton onClick={handleClickOpen}>
                  <CheckIcon color='success'/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject Applicant">
                <IconButton onClick={handleClickOpen}>
                  <CloseIcon color='warning'/>
                </IconButton>     
              </Tooltip>
              {dialogConfirmation(false, 'John',  project.title)}
            </ListItemSecondaryAction>
          )
      }
      if (group == "Past Applicants") {
        return (
            <ListItemSecondaryAction>
              <Tooltip title="Contact">
                  <IconButton>
                    <Link onClick={(e) => sendEmail(e)}>
                      <SendIcon color='primary'/>
                    </Link>
                  </IconButton>
              </Tooltip>
              <Tooltip title="Accept Applicant">
                <IconButton onClick={handleClickOpen}>
                  <CheckIcon color='success'/>
                </IconButton>
              </Tooltip>
              {/* {dialogConfirmation(true, 'John',  project.title)} */}
            </ListItemSecondaryAction>

          )
      }
      return (
        <ListItemSecondaryAction>
            <Tooltip title="Contact">
                  <IconButton>
                    <Link onClick={(e) => sendEmail(e)}>
                      <SendIcon color='primary'/>
                    </Link>
                  </IconButton>
            </Tooltip>
        </ListItemSecondaryAction>
      )
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
        {applicantOptions(group)}
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
              {/* <MemberDropdown project={project} memberId={value.memberId} group={group}/> */}
            </div>
          )
        })}
        </List>
      </Collapse>
    </List>
    </div>
  );
}