import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'

function NewUserStudent() {
    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <h1>New User</h1>
                <p>Login Information</p>
                <div></div>
                <input
                    type="text"
                    className="email-address"
                    placeholder="example@lion.lmu.edu"
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
                        Student
                    </Button>
                    <Button
                        className="btn2"
                        size="large"
                        variant="outlined"
                        color="error"
                    >
                        Faculty/Staff
                    </Button>
                </div>
                <br></br>
                <br></br>
                <div className="button3">
                    <Button className="btn3" size="medium" color="secondary">
                        Continue to Profile
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewUserStudent
