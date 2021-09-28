import React from 'react'
import '../Styles/Homepage.css'
// import '../Styles/Homepage.html'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="top-homepage">
                <img src={beakerLogo} alt="logo" />
                <h1> LMU's very own hub for research and collaboration </h1>
                <div></div>
                <p> I am a.... </p>
            </div>

            <Button
                className="btn"
                size="large"
                variant="outlined"
                color="error"
            >
                student
            </Button>
            <br></br>
            <br></br>
            <Button
                className="btn"
                size="large"
                variant="outlined"
                color="primary"
            >
                Faculty/Staff
            </Button>
            <div></div>
        </div>
    )
}

export default Homepage
