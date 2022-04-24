import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RequiredDialog(props) {

    const { onClickState, onClose, fields } = props

    const handleClose = () => {
        onClose(false)
    }
    
    const text = (fields) => {
        return `The following fields: ${fields.join(",")} are required and cannot be left empty.`
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
                Invalid Submission: Missing fields
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {text(fields)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Return</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}