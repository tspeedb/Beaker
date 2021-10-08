import React from 'react'
import '../Styles/Welcomepage.css'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

function Welcomepage() {
    return (
        <div className="welcomepage-container">
            {/* <video src="/videos/welcomevideo.mov" autoPlay loop muted /> */}
            <div className="wrapper"></div>
            <div className="top-welcomepage">
                <img src={beakerLogo} alt="logo" />

                <h1> LMU's very own hub for research and collaboration </h1>
            </div>
            <div style={{ backgroundColor: 'black', opacity: '85%' }}>
                <p
                    style={{
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    {' '}
                    " Scientific beakers can be used to combine entities to
                    produce a solution. Similar to that, LMU's Beaker <br></br>{' '}
                    will bring together people from different departments to
                    produce <br></br>a succesfull research project " - Beaker
                    Team
                </p>

                <hr></hr>

                <div>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        }}
                    >
                        <p
                            style={{
                                color: 'white',
                            }}
                        >
                            <strong>Find amazing talent</strong> <br></br>
                            Post projects and see who <br></br> matches your
                            project qualifications
                        </p>
                        <p
                            style={{
                                color: 'white',
                            }}
                        >
                            {' '}
                            <strong> Make yourself known </strong> <br></br>
                            Get seen by those who are <br></br> looking for
                            someone just like you
                        </p>
                        <p
                            style={{
                                color: 'white',
                            }}
                        >
                            {' '}
                            <strong> Make connections </strong> <br></br>
                            Get connected with people <br></br> outside of your
                            major
                        </p>
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
