import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
// import firebase from './firebase'

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
import AllMembers from './Pages/AllMembers'
import AboutProject from './Pages/AboutProject'
import AboutMember from './Pages/AboutMember'
import MyProjects from './Pages/MyProjects'

function App() {
    // const ref = firebase.firestore().collection('students')
    // console.log(ref)
    const [projects, setProjects] = useState([])
    const projectsCollectionRef = collection(db, 'projects')
    useEffect(() => {
        const getProjects = async () => {
            const data = await getDocs(projectsCollectionRef)
            //loop through documents in collection
            // console.log(data)
            // console.log('pasta')
            setProjects(
                data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
            )
        }
        getProjects()
    }, [projectsCollectionRef])
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={Welcomepage} />
                    <Route path="/homepage" exact component={Homepage} />
                    <Route
                        path="/projectspage"
                        exact
                        render={(props) => (
                            <Projectspage {...props} projects={projects} />
                        )}
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
                    {/* <Route
                        path="/aboutproject"
                        exact
                        component={AboutProject}
                    /> */}

                    <Route path="/allmembers" exact component={AllMembers} />
                    <Route
                        path="/aboutproject/:projectId"
                        exact
                        render={(props) => (
                            <AboutProject {...props} projects={projects} />
                        )}
                    />
                    <Route
                        path="/aboutmember/:memberId"
                        exact
                        render={(props) => <AboutMember {...props} />}
                    />
                    <Route path="/myprojects" exact component={MyProjects} />
                </Switch>
            </Router>
        </>
        // <Button variant="contained">Hello World</Button>
    )
}

export default App
