import React from 'react'
import '../Styles/Welcomepage.css'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

function Welcomepage() {
    return (
        <div className="welcomepage-container">
            <div className="top-welcomepage">
                {/* <video src="/videos/Dust-impact-03.mov" autoPlay loop muted /> */}
                <img src={beakerLogo} alt="logo" />\
                <h1> LMU's very own hub for research and collaboration </h1>
            </div>
            <p>
                {' '}
                Scientific beakers can be used to combine entities to produce a
                solution. Similar to that, LMU's Beaker will bring together
                people from different departments to produce a succesfull
                research project
            </p>
            <div>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                    }}
                >
                    <p>
                        Find amazing talent <br></br>
                        Post projects and see who matches your project
                        qualifications
                    </p>
                    <p>
                        {' '}
                        Make yourself known <br></br>
                        Get seen by those who are looking for someone just like
                        you
                    </p>
                    <p>
                        {' '}
                        Make connections <br></br>
                        Get connected with people outside of your major
                    </p>
                </Box>
                <div className="button1">
                    <Link className="button-link" to="/homepage">
                        <Button className="btn1" size="large" color="primary">
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage
