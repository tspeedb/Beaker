import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import firebase from 'firebase/compat/app'
import { registerWithEmailAndPassword } from '../authActions'

const Confirm = ({ values }) => {
    const {
        firstName,
        middleName,
        lastName,
        nickname,
        year,
        major,
        minor,
        link,
        pronouns,
        resume,
        softskills,

        bio,
        imageAsUrl,
        students,
        email,
    } = values
    const register = () => {
        if (!email) alert('Please enter email')
        registerWithEmailAndPassword(firstName, lastName, email)
    }
    return (
        <div>
            <h4>Your data has been submitted successfully 😇 </h4>
            <ListGroup style={{ maxWidth: '600px', margin: 'auto' }}>
                <ListGroup.Item variant="secondary">
                    FIRST NAME: {firstName}{' '}
                </ListGroup.Item>
                <ListGroup.Item variant="success">
                    LAST NAME: {lastName}
                </ListGroup.Item>
                <ListGroup.Item variant="danger">EMAIL: {email}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default Confirm
