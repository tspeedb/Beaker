import React from 'react'
import '../Styles/Welcomepage.css'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'
import checkmark from '../Images/checkmark.png'
import lightbulb from '../Images/lightbulb.png'
import connection from '../Images/connection.png'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

function Welcomepage() {
    return (
        <div className="welcomepage-container">
            <div className="top-welcomepage">
                {/* <video src="/videos/Dust-impact-03.mov" autoPlay loop muted /> */}
                <img src={beakerLogo} alt="logo" />
                <h1>
                    {' '}
                    LMU's very own hub for research <br></br> and collaboration{' '}
                </h1>
            </div>
            <p className="welcome-info">
                {' '}
                Scientific beakers can be used to combine entities to produce a
                solution. <br></br> Similar to that, LMU's Beaker will bring
                together people from different departments to produce a
                successful research project
            </p>
            <div>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                    }}
                >
                    <div>
                        <img
                            className="checkmark"
                            src={checkmark}
                            alt="check"
                        />
                        <p className="title">
                            Find amazing talent
                            <div className="info">
                                Post projects and see who <br></br> matches your
                                project <br></br> qualifications
                            </div>
                        </p>
                    </div>
                    <div>
                        <img className="lightbulb" src={lightbulb} alt="bulb" />
                        <p className="title">
                            {' '}
                            Make yourself known
                            <div className="info">
                                Get seen by those who are <br></br> looking for
                                someone just like you
                            </div>
                        </p>
                    </div>
                    <div>
                        <img
                            className="connection"
                            src={connection}
                            alt="connect"
                        />
                        <p className="title">
                            {' '}
                            Make connections
                            <div className="info">
                                Get connected with people <br></br> outside of
                                your major
                            </div>
                        </p>
                    </div>
                </Box>
                <div className="button1">
                    <Link className="button-link" to="/homepage">
                        <Button
                            className="btn1"
                            size="large"
                            variant="outlined"
                            color="primary"
                        >
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage
