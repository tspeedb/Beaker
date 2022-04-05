import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'

function NewUserFacultyStaff() {
    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <h1>New Falculty</h1>
                <p className="signin">Login Information</p>
                <div></div>
                <input
                    type="text"
                    className="email-address"
                    placeholder="example@lmu.edu"
                />
                <div></div>
                <br></br>
                <input
                    type="text"
                    className="password"
                    placeholder="password"
                />
                <div></div>
                <div className="button1">
                    <Button
                        className="btn1"
                        size="medium"
                        variant="outlined"
                        color="secondary"
                    >
                        Continue to Profile
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewUserFacultyStaff
