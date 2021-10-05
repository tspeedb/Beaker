import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage'
import Projectspage from './Pages/Projectspage'
import Lookingpage from './Pages/Lookingpage'
import StudentSignIn from './Pages/StudentSignIn'
import FacultyStaffSignIn from './Pages/FacultyStaffSignIn'
import NewUserStudent from './Pages/NewUserStudent'
import NewUserFacultyStaff from './Pages/NewUserFacultyStaff'
import Loginpage from './Pages/Loginpage'
function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route
                        path="/projectspage"
                        exact
                        component={Projectspage}
                    />

                    <Route path="/lookingpage" exact component={Lookingpage} />

                    <Route
                        path="/studentsignin"
                        exact
                        component={StudentSignIn}
                    />

                    <Route
                        path="/facultystaffsignin"
                        exact
                        component={FacultyStaffSignIn}
                    />

                    <Route
                        path="/newuserstudent"
                        exact
                        component={NewUserStudent}
                    />

                    <Route
                        path="/newuserfacultystaff"
                        exact
                        component={NewUserFacultyStaff}
                    />
                    <Route path="/loginpage" exact component={Loginpage} />
                </Switch>
            </Router>
        </>
        // <Button variant="contained">Hello World</Button>
    )
}

export default App
