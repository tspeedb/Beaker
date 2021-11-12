import '../Styles/Homepage.css'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion/dist/framer-motion'

const test = {
    initial: {
        height: '100vh',
        bottom: 0,
    },
    animate: {
        height: 0,
        transition: {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
        },
    },
}

function Homepage() {
    return (
        <motion.div exit={{ opacity: 10 }} animate="animate" variants={test}>
            <div className="homepage-container">
                <div className="top-homepage">
                    <img src={beakerLogo} alt="logo" />
                    <h1> LMU's very own hub for research and collaboration </h1>
                </div>
                <div></div>
                <p className="click-option">
                    {' '}
                    click an option below to begin:{' '}
                </p>

                <div className="button1">
                    <Link className="button-link" to="./signin">
                        <Button
                            className="btn1"
                            size="large"
                            variant="outlined"
                            color="error"
                            path="./signin"
                        >
                            student
                        </Button>
                    </Link>
                </div>
                <br></br>
                <div className="button2">
                    <Link className="button-link" to="./signin">
                        <Button
                            className="btn2"
                            size="large"
                            variant="outlined"
                            color="primary"
                        >
                            Faculty/Staff
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Homepage
