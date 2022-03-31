import React, { useState, useEffect } from 'react'
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
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'


export default function ManageDropdown({ project, group }) {
  const [open, setOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([])
  const [applicants, setApplicants] = useState([])
  const [rejected, setRejected] = useState([])

  const handleClick = () => {
    setOpen(!open);
  };

  const sendEmail = (e, member) => {
    // window.open("mailto:user@example.com?subject=Subject&body=message%20goes%20here");
    // window.open("mailto:xyz@abc.com")
    e.preventDefault()
    window.location = 'mailto:example@example.com'
  }

  // const memberCollectionRef = doc(db, 'students', memberId)

  // const getMember = async () => {
  //   const data = await getDoc(memberCollectionRef)
  //   const selected = data.data()
  //   setMember(selected)
  // }
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
                    <Link onClick={(e) => sendEmail(e)}>
                      <SendIcon color='primary'/>
                    </Link>
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