import React from 'react'

// import '../Styles/Homepage.html'
import Button from '@mui/material/Button'

function Lookingpage() {
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '20rem' }}>
                <Button
                    variant="contained"
                    style={{
                        fontSize: '2.5rem',
                        backgroundColor: 'rgba(172, 12, 48, 1)',
                        color: 'white',
                        paddingTop: '25px',
                        paddingBottom: '25px',
                        margin: '5rem',
                        textAlign: 'left',
                        textTransform: 'none',
                        position: 'relative',
                    }}
                >
                    Looking <br />
                    for a <br />
                    project
                </Button>

                <Button
                    variant="contained"
                    style={{
                        fontSize: '2.5rem',
                        backgroundColor: 'rgba(16, 127, 183, 1)',
                        color: 'white',
                        paddingTop: '25px',
                        paddingBottom: '25px',
                        margin: '5rem',
                        textAlign: 'left',
                        textTransform: 'none',
                    }}
                >
                    Looking <br /> for a <br />
                    member
                </Button>
            </div>
        </div>
    )
}

export default Lookingpage
