import React from 'react'
import '../Styles/Homepage.css'
import Button from '@mui/material/Button'

function Homepage() {
    return (
        <div className="homepage-container">
            <h1>Beaker</h1>
            <p> Testing Purposes: please delete this before demo </p>
            <p> LMU's very own hub for research and collaboration </p>
            <p> I am a.... </p>
            <Button
                className="btn"
                size="large"
                variant="outlined"
                color="primary"
            >
                student
            </Button>
            <br></br>
            <Button
                className="btn"
                size="large"
                variant="outlined"
                color="primary"
            >
                professor
            </Button>
            <div></div>
        </div>
    )
}

export default Homepage
