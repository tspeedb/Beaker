import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog(props) {

    const { onClickState, onClose, onAction, accept, member, group, project } = props

    const handleClose = () => {
        onClose(false)
    }
    
    const handleConfirmAction = () => {
        onAction(member.id, group)
    }

    const handleActionClose = () => {
        handleConfirmAction(member.id, group)
        onClose(false)
    }

    const title = (accept, member, project) => {
        let action = (accept) ? 'accept' : 'reject'
        return `Would you like to ${action} ${member.id} ${member.first} ${member.last} for the project ${project}?`
    }

    const text = (accept, member, project) => {
        let action = (accept) ? 'Accepting' : 'Rejecting'
        let consequence = (accept) ? 'add them to' : 'remove them from'
        return `${action} ${member.id} ${member.first} ${member.last} will ${consequence} the project ${project}.`
    }

    return (
        <div>
            <Dialog
                open={onClickState}
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
                <Button color='warning' onClick={handleClose}>Cancel</Button>
                <Button onClick={handleActionClose} autoFocus>Accept</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}