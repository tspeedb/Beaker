import React, { useState, useEffect, useMemo } from 'react'
import { db } from '../firebase'
import { doc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore'
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

export default function ManageDropdown({ project, id, groupUse }) {

  class Sample {
    constructor(id, first, last, pronouns, email){
      this.id = id
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

  const [projectState, setProject] = useState({})
  const [projectTitle, setProjectTitle] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])
  // const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [acceptConfirmation, setAcceptConfirmation] = useState()
  const [groupMode, setGroupMode] = useState()
  const [editedGroupMembers, setEditedGroupMembers] = useState(sampleMembers)
  const [editedApplicants, setEditedApplicants] = useState(sampleApplicants)
  const [editedRejected, setEditedRejected] = useState(sampleRejected)
  const [currentMember, setCurrentMember] = useState(-1)
  const [accepted, setAccepted] = useState()

  const projectCollectionRef = doc(db, 'projects', id)

  const getProject = async () => {
    const data = await getDoc(projectCollectionRef)
    const selected = data.data()
    setProject(selected)
    console.log(selected)
    setGroupMembers(selected.groupMembers)
    setApplicants(selected.applicants)
    setRejected(selected.rejected)
    // setGroupMembers(sampleMembers)
    // setApplicants(sampleApplicants)
    // setRejected(sampleRejected)
    setProjectTitle(selected.title)
    setEditedGroupMembers(groupMembers)
    setEditedApplicants(applicants)
    setEditedRejected(rejected)
}

  useEffect(() => {
    getProject()
    setGroupMode(groupUse)
    setCurrentMember(getCurrentMember())
    setEditedGroupMembers(getCurrentMembers())
    console.log("-------", groupMode, "-------")
    console.log("use members", editedGroupMembers)
    setEditedApplicants(getCurrentApplicants())
    console.log("use applicants", editedApplicants)
    setEditedRejected(getCurrentRejected())
    console.log("use rejected", editedRejected)
    console.log("--------------")
    // getUsers()
  }, [
      currentMember,  
      applicants.length, 
      editedApplicants.length, 
      groupMembers.length,
      editedGroupMembers.length, 
      rejected.length, 
      editedRejected.length, 
    ])

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

  // const usersCollectionRef = useMemo(() => collection(db, 'students'), [])

  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionRef)
  //   const selected = (data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
  //   setUsers(selected)
  // }

  const getUser = (group, id) => {
    return group.filter((user) => user.id === id)[0]
  }

  const getCurrentMember = () => {
    return currentMember
  }

  const getCurrentMembers = () => {
    return editedGroupMembers
  }

  const getCurrentApplicants = () => {
    return editedApplicants
  }

  const getCurrentRejected = () => {
    return editedRejected
  }

  const setUpGroups = () => {
    if (groupMode === 'Applicants') return getCurrentApplicants()
    if (groupMode === 'Past Applicants') return getCurrentRejected()
    return getCurrentMembers()
  }

  const updateArrayStates = (groupMode, from, to) => {
    if (groupMode === 'Applicants') {
      // set
    }
  }

  // const checkArrEquality = (a, b) => {
  //   if (a === b) return true
  //   if (a == null || b == null) return false
  //   if (a.length !== b.length) return false

  //   for (let i = 0; i < a.length; i++) {
  //       if (!a.includes(b[i]) || !b.includes(a[i])) return false
  //   }
  //   return true
  // }
  
  const moveMember = (member, from, to) => {
    // setState(state++)
    // if (from.filter(m => m.id !== member).length === 0) return
    const user = getUser(from, member)
    let updatedApplicants = from.filter(m => m.id !== member)
    updatedApplicants.map(x => x = x.id)
    setEditedApplicants(updatedApplicants)
    let updatedGroupMembers = [...to, user]
    updatedApplicants.map(x => x = x.id)
    setEditedGroupMembers(updatedGroupMembers)
    
    // setRejected(selected.rejected)
    return {updatedApplicants, updatedGroupMembers}
  }

  const translate = (arr) => {
    console.log("arr" + arr)
    let p = []
    for (let obj of arr) {
      p.push({id: obj.id, firstname: obj.firstname, lastname: obj.lastname, pronouns: obj.pronouns, email: obj.email})
    }
    return p
  }

  const updateMembers = async (applicants, members, rejected) => {
    let updatedMembers = translate(members)
    let updatedApplicants = translate(applicants)
    let updatedRejected = translate(rejected)
    await updateDoc(projectCollectionRef, {
      groupMembers: updatedMembers, 
      applicants: updatedApplicants, 
      rejected: updatedRejected
    })
    setGroupMembers(updatedMembers)
    setApplicants(updatedApplicants)
    setRejected(updatedRejected)
    getProject()
  }

  const updateDocMembers = async(member, from, to) => {
    let {updatedApplicants, updatedGroupMembers} = moveMember(member, from, to)
    updateMembers(updatedApplicants, updatedGroupMembers, rejected)
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
      return (<div>{sendIcon(member)}{rejectIcon(member)}</div>)
  }

  const handleAccept = (id) => {
    let arr = (groupMode === 'Applicants') ? editedApplicants : editedRejected
    updateDocMembers(id, arr, editedGroupMembers)
    setAccepted(true)
  }

  const handleReject = (id) => {
    moveMember(id, editedApplicants, editedRejected)
    setAccepted(false)
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
            <Link to={`/createproject`}>
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