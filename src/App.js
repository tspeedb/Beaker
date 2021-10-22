import * as React from 'react'
import firebase from './firebase'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage'
import Projectspage from './Pages/Projectspage'
import SignIn from './Pages/SignIn'
import NewUserStudent from './Pages/NewUserStudent'
import NewUserFacultyStaff from './Pages/NewUserFacultyStaff'
import Welcomepage from './Pages/Welcomepage'
import StudentProfile from './Pages/StudentProfile'
import FacultyStaffProfile from './Pages/FacultyStaffProfile'
import BasedonProfile from './Pages/BasedonProfile'
import Browse from './Pages/Browse'
import Bookmarked from './Pages/Bookmarked'
import AboutProject from './Pages/AboutProject'
import MemberProfiles from './Pages/MemberProfiles'
import AllMembers from './Pages/AllMembers'
import LearnMore from './Pages/LearnMore'

function App() {
    const ref = firebase.firestore().collection('students')
    console.log(ref)
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
                    <Route
                        path="/studentprofile"
                        exact
                        component={StudentProfile}
                    />
                    <Route
                        path="/facultystaffprofile"
                        exact
                        component={FacultyStaffProfile}
                    />
                    <Route
                        path="/basedonprofile"
                        exact
                        component={BasedonProfile}
                    />
                    <Route path="/browse" exact component={Browse} />
                    <Route path="/bookmarked" exact component={Bookmarked} />
                    <Route
                        path="/aboutproject"
                        exact
                        component={AboutProject}
                    />
                    <Route
                        path="/memberprofiles"
                        exact
                        component={MemberProfiles}
                    />

                    <Route path="/allmembers" exact component={AllMembers} />
                    <Route
                        path="/learnmore/:projectId"
                        exact
                        render={(props) => <LearnMore {...props} />}
                    />
                </Switch>
            </Router>
        </>
        // <Button variant="contained">Hello World</Button>
    )
}

export default App
