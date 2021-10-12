import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage'
import Projectspage from './Pages/Projectspage'
import SignIn from './Pages/SignIn'
import NewUserStudent from './Pages/NewUserStudent'
import NewUserFacultyStaff from './Pages/NewUserFacultyStaff'
import Welcomepage from './Pages/Welcomepage'
import StudentProfile from './Pages/StudentProfile'

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={Welcomepage} />
                    <Route path="/homepage" exact component={Homepage} />
                    <Route
                        path="/projectspage"
                        exact
                        component={Projectspage}
                    />

                    <Route path="/signin" exact component={SignIn} />

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

                    <Route path="/profile" exact component={StudentProfile} />
                </Switch>
            </Router>
        </>
        // <Button variant="contained">Hello World</Button>
    )
}

export default App
