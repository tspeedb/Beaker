import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'

function SignIn() {
    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <p className="signin">Login</p>
                <div></div>
                <input
                    type="text"
                    className="email-address"
                    placeholder="LMU/LLS email"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                />
                <div></div>
                <br></br>
                <div className="button1">
                    <Button
                        className="btn1"
                        size="large"
                        variant="outlined"
                        color="primary"
                    >
                        Sign In
                    </Button>
                </div>
                <div></div>
                <br></br>
                <div className="button2">
                    <Button className="btn2" size="medium" color="secondary">
                        Forgot Password?
                    </Button>
                </div>
                <br></br>
                <br></br>
                <div className="button3">
                    <Link className="button-link" to="./newuserstudent">
                        <Button className="btn3" size="medium" color="error">
                            New Here?
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
