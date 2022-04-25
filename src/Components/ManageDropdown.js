import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
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
  const [projectState, setProject] = useState({})
  const [projectTitle, setProjectTitle] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [acceptConfirmation, setAcceptConfirmation] = useState()
  const [groupMode, setGroupMode] = useState()
  const [editedGroupMembers, setEditedGroupMembers] = useState([])
  const [editedApplicants, setEditedApplicants] = useState([])
  const [editedRejected, setEditedRejected] = useState([])
  const [currentMember, setCurrentMember] = useState(-1)
  const [users, setUsers] = useState([])

  const projectCollectionRef = doc(db, 'projects', id)

  class Sample {
    constructor(id, first, last, pronouns, email, photo, uid){
      this.id = id
      this.firstname = first
      this.lastname = last
      this.pronouns = pronouns
      this.email = email
      this.photo = photo
      this.uid = uid
    }
  }

  const sampleMembers = [
    new Sample(1, "Mina", "Michaels", "she/her", "mina@example.com", "https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/EDUCMS/tz7n-7vqceaq86dprdnzag.jpg", "124"), 
    new Sample(2, "Camden", "Dile", "he/him", "camden@example.com", "https://www.jmwsons.com/wp-content/uploads/sites/29/2018/08/student-3500990_640.jpg", "125"), 
  ]
  
  const sampleApplicants = [
    new Sample(4, "James", "Dove", "he/him", "james@example.com", "https://www.usnews.com/dims4/USNEWS/e52d968/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F44%2F94%2Ff9f5465143a28aac341409bb8d7b%2F200113-studyingman-stock.jpg", "125"), 
    new Sample(5, "Helen", "Bara", "she/her", "helen@example.com", "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2019/01/20092424/nutrition.jpg", "126"), 
  ]

  const sampleRejected = [
    new Sample(8, "Isaac", "Ali", "him/they", "ali@example.com", "https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2021/college-student-glasses-backpack.jpg", "127") 
  ]

  const getProject = async () => {
    const data = await getDoc(projectCollectionRef)
    const selected = data.data()
    setProject({...selected})
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
    setEditedApplicants(getCurrentApplicants())
    setEditedRejected(getCurrentRejected())
  }, [
      currentMember,  
      applicants.length, 
      editedApplicants.length, 
      groupMembers.length,
      editedGroupMembers.length, 
      rejected.length, 
      editedRejected.length, 
      project
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

  const getUser = (group, id) => {
    return group.filter((user) => user.id === id)[0]
  }

  const getUserInfo = async(id) => {
    const projectCollectionRef = doc(db, 'allusers', id)
    const data = await getDoc(projectCollectionRef)
    const selected = data.data()
    let result = Promise.resolve(selected)
    result.then(r => { return r })
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

  const updateArrayStates = (from, to, accepted) => {
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
    return { updatedApplicants, updatedGroupMembers, updatedRejected }
  }
  
  //moves members from and to in-component arrays
  const moveMember = (member, from, to) => {
    const user = getUser(from, member)
    let updatedFrom = from.filter(m => m.id !== member)
    updatedFrom.map(x => x = x.id)
    let updatedTo = [...to, user]
    updatedTo.map(x => x = x.id)
    return { updatedFrom, updatedTo }
  }

  const translate = (arr) => {
    let p = []
    for (let obj of arr) {
      p.push({id: obj.id, firstname: obj.firstname, lastname: obj.lastname, pronouns: obj.pronouns, email: obj.email, photo: obj.photo})
    }
    return p
  }

  //updates the members and sets them to be in firebase
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

  //moves members then updates firebase upon every action
  const updateDocMembers = async (member, from, to, accepted) => {
    let { updatedFrom, updatedTo } = moveMember(member, from, to)
    let { updatedApplicants, updatedGroupMembers, updatedRejected } = updateArrayStates(updatedFrom, updatedTo, accepted)
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

  const handleAccept = async (id) => {
    let arr = (groupMode === 'Applicants') ? editedApplicants : editedRejected
    updateDocMembers(id, arr, editedGroupMembers, true) 
  }

  const handleReject = async (id) => {
    let arr = (groupMode === 'Applicants') ? editedApplicants : editedGroupMembers
    updateDocMembers(id, arr, editedRejected, false)
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
                <Avatar src={member.photo}/>
              </ListItemAvatar>
            </Link>
          </Tooltip>
          <ListItemText primary={`${member.firstname} ${member.lastname}`} secondary={`Pronouns ${member.pronouns}`} style={{ marginTop: '30' }}/>
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