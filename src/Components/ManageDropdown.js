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
import { CollectionsBookmarkRounded } from '@material-ui/icons';

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

  const updateArrayStates = (from, to) => {
    let updatedApplicants, updatedGroupMembers, updatedRejected
    if (groupMode === 'Applicants' && accepted) {
      setEditedApplicants(from)
      setEditedGroupMembers(to)
      updatedApplicants = [...from]
      updatedGroupMembers = [...to]
      updatedRejected = [...editedRejected]
    } else if (groupMode === 'Past Applicants' && accepted) {
      setEditedRejected(from)
      setEditedGroupMembers(to)
      updatedApplicants = [...editedApplicants]
      updatedGroupMembers = [...to]
      updatedRejected = [...from]
    } else if (groupMode === 'Applicants' && !accepted) {
      setEditedApplicants(from)
      setEditedRejected(to)
      updatedApplicants = [...from]
      updatedGroupMembers = [...editedGroupMembers]
      updatedRejected = [...to]
    } else if (groupMode === 'Members' && !accepted) {
      setEditedGroupMembers(from)
      setEditedRejected(to)
      updatedApplicants = [...editedApplicants]
      updatedGroupMembers = [...from]
      updatedRejected = [...to]
    }
    console.log("--in update array states--")
    console.log(groupMode)
    console.log(accepted)
    // console.log(updatedApplicants)
    // console.log(updatedMembers)
    // console.log(updatedRejected)
    return { updatedApplicants, updatedGroupMembers, updatedRejected }
  }
  
  //moves members from and to in-component arrays
  const moveMember = (member, from, to) => {
    const user = getUser(from, member)
    let updatedFrom = from.filter(m => m.id !== member)
    updatedFrom.map(x => x = x.id)
    let updatedTo = [...to, user]
    updatedTo.map(x => x = x.id)
    // console.log("updateArrayStates(from, to)")
    // console.log(updateArrayStates(from, to))
    return { updatedFrom, updatedTo }
  }

  const translate = (arr) => {
    let p = []
    for (let obj of arr) {
      p.push({id: obj.id, firstname: obj.firstname, lastname: obj.lastname, pronouns: obj.pronouns, email: obj.email})
    }
    return p
  }

  //updates the members and sets them to be in firebase
  const updateMembers = async (applicants, members, rejected) => {
    console.log("~before translate~~")
    console.log(applicants)
    console.log(members)
    console.log(rejected)
    console.log("~~~")
    let updatedMembers = translate(members)
    let updatedApplicants = translate(applicants)
    console.log(rejected)
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

  //moves members then updates firebase upon every action
  const updateDocMembers = async (member, from, to) => {
    let { updatedFrom, updatedTo } = moveMember(member, from, to)
    console.log("in updateDocMembers")
    console.log(updatedFrom, updatedTo)
    let { updatedApplicants, updatedGroupMembers, updatedRejected } = updateArrayStates(updatedFrom, updatedTo)
    updateMembers(updatedApplicants, updatedGroupMembers, updatedRejected)
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
    let arr = (groupMode === 'Applicants') ? editedApplicants : editedGroupMembers
    updateDocMembers(id, arr, editedRejected)
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