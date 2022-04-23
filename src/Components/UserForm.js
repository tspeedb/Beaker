import React, { useState } from 'react'
import StudentProfile from '../Pages/StudentProfile'
import NewUserStudent from '../Pages/NewUserStudent'
import Confirm from '../Pages/Confirm'
import '../Styles/SignIn.css'

import { Button } from 'react-bootstrap'

const UserForm = () => {
    //Steps
    const [activeStep, setActiveStep] = useState(0)

    const getSteps = () => {
        return ['StudentProfile', 'NewUserStudent', 'Confirm']
    }

    const steps = getSteps()

    //State variables
    const [multiFormValues, setMultiFormValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        nickname: '',
        year: '',
        major: [],
        minor: '',
        link: '',
        pronouns: '',
        resume: '',
        softskills: '',

        bio: '',
        imageAsUrl: '',
        students: '',
    })

    //Navigates to the next page
    const handleNext = () => {
        setActiveStep((nextStep) => nextStep + 1)
    }
    //Navigates to the Previous page
    const handleBack = () => {
        setActiveStep((previousStep) => previousStep - 1)
    }

    //Handle form value state on change
    const handleChange = (input) => (e) => {
        setMultiFormValues({ ...multiFormValues, [input]: e.target.value })
    }
    return (
        <div>
            {activeStep === 0 && (
                <NewUserStudent
                    values={multiFormValues}
                    handleChange={handleChange}
                />
            )}
            {activeStep === 1 && (
                <StudentProfile
                    values={multiFormValues}
                    handleChange={handleChange}
                />
            )}
            {activeStep === 2 && (
                <Confirm values={multiFormValues} handleChange={handleChange} />
            )}

            <Button
                disabled={activeStep === 0}
                className="mr-5"
                onClick={handleBack}
                style={activeStep === 2 ? { display: 'none' } : {}}
            >
                Back
            </Button>
            <div className="continue-to-profile-button">
                <Button
                    className="btn1"
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    onClick={handleNext}
                >
                    {activeStep === steps.length - 2
                        ? 'Submit'
                        : 'Continue To Profile'}
                </Button>
            </div>

            {/* <Button
                className="ml-5"
                variant="contained"
                onClick={handleNext}
                style={activeStep === 2 ? { display: 'none' } : {}}
            >
                {activeStep === steps.length - 2
                    ? 'Submit'
                    : 'Continue To Profile'}
            </Button> */}
        </div>
    )
}

export default UserForm
