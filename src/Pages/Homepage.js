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
            </div>
            <div></div>
            <p> I am a: </p>

            <div className="button1">
                <Button
                    className="btn1"
                    size="large"
                    variant="outlined"
                    color="error"
                >
                    student
                </Button>
            </div>
            <br></br>
            <div className="button2">
                <Button
                    className="btn2"
                    size="large"
                    variant="outlined"
                    color="primary"
                >
                    Faculty/Staff
                </Button>
            </div>
        </div>
    )
}

export default Homepage
