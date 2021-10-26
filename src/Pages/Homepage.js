import '../Styles/Homepage.css'
import Button from '@mui/material/Button'
import beakerLogo from '../Images/whiteBeakerLogoBgRemoved.png'
import { Link } from 'react-router-dom'

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="top-homepage">
                <img src={beakerLogo} alt="logo" />
                <h1> LMU's very own hub for research and collaboration </h1>
            </div>
            <div></div>
            <p className="click-option"> click an option below to begin: </p>

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
    )
}

export default Homepage
