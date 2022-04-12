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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import ConfirmationDialog from './ConfirmationDialog'

export default function ManageDropdown({ project, groupUse }) {
  const [projectTitle, setProjectTitle] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [acceptConfirmation, setAcceptConfirmation] = useState()
  const [groupMode, setGroupMode] = useState()
  const [editedGroupMembers, setEditedGroupMembers] = useState()
  const [editedApplicants, setEditedApplicants] = useState()
  const [editedRejected, setEditedRejected] = useState()
  const [currentMember, setCurrentMember] = useState(-1)

  class Sample {
    constructor(key, first, last, pronouns, email){
      this.id = key
      this.firstname = first
      this.lastname = last
      this.pronouns = pronouns
      this.email = email
    }
  }

  const sampleMembers = [
    new Sample(1, "Capy", "Bara", "she/her", "capybara@jungle.com"), 
    new Sample(2, "Croco", "Dile", "he/him", "crocodile@river.com"), 
    new Sample(3, 'Ali', "Gator", 'she/her', 'alligator@river.com')
  ]
  
  const sampleApplicants = [
    new Sample(4, "Capy", "Bara", "she/her", "capybara@jungle.com"), 
    new Sample(5, "Croco", "Dile", "he/him", "crocodile@river.com"), 
    new Sample(6, 'Ali', "Gator", 'she/her', 'alligator@river.com')
  ]

  const sampleRejected = [
    new Sample(7, "Capy", "Bara", "she/her", "capybara@jungle.com"), 
    new Sample(8, "Croco", "Dile", "he/him", "crocodile@river.com"), 
    new Sample(9, 'Ali', "Gator", 'she/her', 'alligator@river.com')
  ]

  useEffect(() => {
    setGroupMembers(project?.groupMembers)
    setApplicants(project?.applicants)
    setRejected(project?.rejected)
    setProjectTitle(project?.title)
    setGroupMode(groupUse)
    setCurrentMember(getCurrent())
    // setEditedGroupMembers(sampleMembers)
    // setEditedApplicants(sampleApplicants)
    // setEditedRejected(sampleRejected)
    // getUsers()
  }, [currentMember])

  const handleClick = () => {
    setOpen(!open);
  }

  const handleClickOpenAccept = (id, e) => {
    setDialogOpen(true)
    setAcceptConfirmation(true)
    e.currentTarget = id
    setCurrentMember(id)
  }

  const handleClickOpenReject = (id, e) => {
    setDialogOpen(true)
    setAcceptConfirmation(false)
    e.currentTarget = id
    setCurrentMember(id)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const sendEmail = (e, member) => {
    e.preventDefault()
    window.location = `mailto:${member.email}`
  }

  const usersCollectionRef = useMemo(() => collection(db, 'students'), [])

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef)
    const selected = (data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
    setUsers(selected)
  }

  const getUser = (group, id) => {
    return group.filter((user) => user.id === id)[0]
  }

  const getCurrent = () => {
    return currentMember
  }

  const setUpGroups = () => {
    if (groupMode === 'Applicants') return sampleApplicants
    if (groupMode === 'Past Applicants') return sampleRejected
    return sampleMembers
  }
  
  const moveMember = (member, from, to) => {
    if (!from.includes(member)) return
    from = from.filter(m => m !== member)
    to.add(member)
  }

  const sendIcon = (member) => {
    return (
      <Tooltip title="Contact">
        <IconButton onClick={(e) => sendEmail(e, member)}>
            <SendIcon color='primary'/>
        </IconButton>
      </Tooltip>
    )
  }

  const acceptIcon = (member) => {
    return (
      <Tooltip title="Accept Applicant">
        <IconButton onClick={(e) => handleClickOpenAccept(member.id, e)}>
          <CheckIcon color='success'/>
        </IconButton>
      </Tooltip>
    )
  }

  const rejectIcon = (member) => {
    return (
      <Tooltip title="Reject Applicant">
        <IconButton onClick={(e) => handleClickOpenReject(member.id, e)}>
          <CloseIcon color='warning'/>
        </IconButton>     
      </Tooltip>
    )
  }

  const conditionalIcons = (member) => {
      if (groupMode === 'Past Applicants') {
        return (<div>{sendIcon(member)}{acceptIcon(member)}</div>)
      }
      if (groupMode === 'Applicants') {
        return (<div>{sendIcon(member)}{acceptIcon(member)}{rejectIcon(member)}</div>)
      }
      return (<div>{sendIcon(member)}</div>)
  }

  const handleAccept = (id) => {
    let arr = (groupMode == 'Applicants') ? sampleApplicants : sampleRejected
    moveMember(id, arr, sampleMembers)
  }

  const handleReject = (id) => {
    moveMember(id, sampleApplicants, sampleRejected)
  }

  const confirmationComponent = (group) => {  
    const m = getUser(group, currentMember)
    if (!acceptConfirmation) {
      return (
        <ConfirmationDialog 
          onClickState={dialogOpen} 
          onClose={handleClose} 
          onAction={handleReject} 
          accept={acceptConfirmation} 
          member={{id: m?.id, first: m?.firstname, last: m?.lastname}} 
          group={group} 
          project={projectTitle}
        />
      )
    }
    return (
      <ConfirmationDialog 
        onClickState={dialogOpen} 
        onClose={handleClose} 
        onAction={handleAccept} 
        accept={acceptConfirmation} 
        member={{id: m?.id, first: m?.firstname, last: m?.lastname}} 
        group={group} 
        project={projectTitle}
      />
    )
  }

  const memberListItem = (id) => {
    const group = setUpGroups(groupMode)
    const member = getUser(group, id)
    return (
      <div>
        <ListItem alignItems='flex-start'>
          <Tooltip title="Visit profile">    
            <Link to={`/editproject/${member.id}`}>
              <ListItemAvatar>
                <Avatar src={`${process.env.PUBLIC_URL}/projectImages/user.png`} />
              </ListItemAvatar>
            </Link>
          </Tooltip>
          <ListItemText primary={`${member.id} ${member.firstname} ${member.lastname}`} secondary={`Pronouns ${member.pronouns}`} style={{ marginTop: '30' }}/>
          {conditionalIcons(member)}
        </ListItem>
      </div>
    )
  }

  const memberList = () => {
    const group = setUpGroups(groupMode)
    return (
      <div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
          {group.map((value) => {
            return(
              <div key={value.id}>
                {memberListItem(value.id)}
              </div>
            )
          })}
          </List>
        </Collapse>
        {confirmationComponent(group)}
      </div>
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
        <ListItemText primary={`Manage ${groupMode}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {memberList()}
    </List>
    </div>
  );
}