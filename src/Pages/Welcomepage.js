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
            <video src="/videos/welcomevideo.mp4" autoPlay loop muted />
            <div className="wrapper"></div>
            <div className="top-welcomepage">
                <img src={beakerLogo} alt="logo" />

                <h1> LMU's very own hub for research and collaboration </h1>
            </div>
            <div
                style={{
                    backgroundColor: 'black',
                    opacity: '85%',
                    paddingTop: '10px',
                }}
            >
                <p className="message">
                    {' '}
                    " Scientific beakers can be used to combine entities to
                    produce a solution. <br></br> Similar to that, LMU's Beaker
                    will bring together people from different departments{' '}
                    <br></br> to produce a successful research project "{' '}
                    <br></br> - Beaker Team
                </p>

                <hr></hr>

                <div
                    style={{
                        paddingTop: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        }}
                    >
                        <div>
                            <img
                                id="check"
                                className="checkmark"
                                src={checkmark}
                                alt="check"
                            />
                            <p className="title">
                                Find amazing talent
                                <div className="info">
                                    Post projects and see who <br></br> matches
                                    your project qualifications
                                </div>
                            </p>
                        </div>
                        <div>
                            <img
                                id="check"
                                className="lightbulb"
                                src={lightbulb}
                                alt="bulb"
                            />
                            <p className="title">
                                Make yourself known
                                <div className="info">
                                    Get seen by those who are <br></br> looking
                                    for someone just like you
                                </div>
                            </p>
                        </div>
                        <div>
                            <img
                                id="check"
                                className="connection"
                                src={connection}
                                alt="connect"
                            />
                            <p className="title">
                                Make connections
                                <div className="info">
                                    Get connected with people <br></br> outside
                                    of your major
                                </div>
                            </p>
                        </div>
                    </Box>
                </div>
                <div className="getstarted">
                    <Link className="button-link" to="/homepage">
                        <Button
                            className="getstarted-btn1"
                            size="large"
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
