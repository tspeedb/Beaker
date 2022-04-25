import React, { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
// import firebase from './firebase'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import studsidebaritems from './studsidebaritems'
import sidebaritems from './sidebaritems'

import Homepage from './Pages/Homepage'
import { AnimatePresence } from 'framer-motion/dist/framer-motion'
import Projectspage from './Pages/Projectspage'
import SignIn from './Pages/SignIn'
import NewUserStudent from './Pages/NewUserStudent'
import NewUserFacultyStaff from './Pages/NewUserFacultyStaff'
import Welcomepage from './Pages/Welcomepage'
import StudentProfile from './Pages/StudentProfile'
import EditStudentProfile from './Pages/EditStudentProfile'
import FacultyStaffProfile from './Pages/FacultyStaffProfile'
import EditFacultyStaffProfile from './Pages/EditFacultyStaffProfile'
import BasedonProfile from './Pages/BasedonProfile'
import Browse from './Pages/Browse'
import Bookmarked from './Pages/Bookmarked'
import AllMembers from './Pages/AllMembers'
import AboutProject from './Pages/AboutProject'
import AboutMember from './Pages/AboutMember'
import AboutStudentProfile from './Pages/AboutStudentProfile'
import AboutFacultyStaffProfile from './Pages/AboutFacultyStaffProfile'
import Dashboard from './Pages/Dashboard'
import StudentDashboard from './Pages/StudentDashboard'
import BookmarkedMembers from './Pages/BookmarkedMembers'
import BookmarkedProjects from './Pages/BookmarkedProjects'
import InvitedMembers from './Pages/InvitedMembers'
import UserProfile from './Pages/UserProfile'
import CreateProject from './Pages/CreateProject'
import EditProject from './Pages/EditProject'
import ProjectDetails from './Pages/FacultyProjectDetails'
import Invitations from './Pages/Invitations'
import ForgotPassword from './Pages/ForgotPassword'
import PrivateRoute from './Components/PrivateRoute'
import { AuthProvider } from './Contexts/authContext'
import AllOwnedProjects from './Pages/AllOwnedProjects'
import UserForm from './Components/UserForm'

function App() {
    // const ref = firebase.firestore().collection('students')
    // console.log(ref)
    const [isStudent, setIsStudent] = useState(true)

    const [projects, setProjects] = useState([])
    const projectsCollectionRef = useMemo(() => collection(db, 'projects'), [])
    useEffect(() => {
        const getProjects = async () => {
            const data = await getDocs(projectsCollectionRef)
            //loop through documents in collection
            setProjects(
                data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
            )
        }
        getProjects()
    }, [projectsCollectionRef])

    const [members, setMembers] = useState([])
    const membersCollectionRef = useMemo(() => collection(db, 'students'), [])
    useEffect(() => {
        const getMembers = async () => {
            const data = await getDocs(membersCollectionRef)
            //loop through documents in collection
            setMembers(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })))
        }
        getMembers()
    }, [membersCollectionRef])

    return (
        <>
            <AuthProvider>
                <Router>
                    <AnimatePresence exitBeforeEnter>
                        <Switch>
                            <Route
                                Route
                                path="/"
                                exact
                                component={Welcomepage}
                            />
                            <Route
                                path="/projectspage"
                                exact
                                render={(props) => (
                                    <Projectspage
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />

                            <Route path="/signin" exact component={SignIn} />
                            {/* <UserForm /> */}

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
                                render={(props) => (
                                    <StudentProfile
                                        {...props}
                                        setMembers={setMembers}
                                    />
                                )}
                            />
                            <Route
                                path="/createproject"
                                exact
                                component={CreateProject}
                            />
                            <Route
                                path="/facultystaffprofile"
                                exact
                                // render={(props) => (
                                //     <FacultyStaffProfile
                                //         {...props}
                                //         setFSMembers={setFSMembers}
                                //     />
                                // )}
                                component={FacultyStaffProfile}
                            />
                            <Route
                                path="/basedonprofile"
                                exact
                                component={BasedonProfile}
                            />
                            <Route path="/browse" exact component={Browse} />
                            <Route
                                path="/bookmarked"
                                exact
                                component={Bookmarked}
                            />
                            <Route
                                path="/forgotPassword"
                                exact
                                component={ForgotPassword}
                            />
                            {/* <Route
                        path="/aboutproject"
                        exact
                        component={AboutProject}
                    /> */}

                            <Route
                                path="/allmembers"
                                exact
                                render={(props) => (
                                    <AllMembers {...props} members={members} />
                                )}
                            />

                            <Route
                                path="/aboutproject/:projectId"
                                exact
                                render={(props) => (
                                    <AboutProject
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />
                            <Route
                                path="/editproject/:projectId"
                                exact
                                render={(props) => (
                                    <EditProject
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />
                            <Route
                                path="/projectdetails/:projectId"
                                exact
                                render={(props) => (
                                    <ProjectDetails
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />
                            <Route
                                path="/editstudentprofile/:memberId"
                                exact
                                render={(props) => (
                                    <EditStudentProfile
                                        {...props}
                                        members={members}
                                    />
                                )}
                            />
                            <Route
                                path="/aboutmember/:memberId"
                                exact
                                render={(props) => (
                                    <AboutMember {...props} members={members} />
                                )}
                            />
                            <Route
                                path="/dashboard"
                                exact
                                render={(props) => (
                                    <Dashboard
                                        sidebaritems={
                                            isStudent
                                                ? studsidebaritems
                                                : sidebaritems
                                        }
                                    />
                                )}
                            />
                            <Route
                                path="/studentdashboard"
                                exact
                                render={(props) => (
                                    <StudentDashboard
                                        sidebaritems={
                                            isStudent
                                                ? studsidebaritems
                                                : sidebaritems
                                        }
                                    />
                                )}
                            />
                            <Route
                                path="/bookmarkedmembers"
                                exact
                                component={BookmarkedMembers}
                            />
                            <Route
                                path="/invitations"
                                exact
                                component={Invitations}
                            />
                            <Route
                                path="/allownedprojects"
                                exact
                                component={AllOwnedProjects}
                            />
                            <Route
                                path="/bookmarkedprojects"
                                exact
                                render={(props) => (
                                    <BookmarkedProjects
                                        {...props}
                                        projects={projects}
                                        sidebaritems={
                                            isStudent
                                                ? studsidebaritems
                                                : sidebaritems
                                        }
                                    />
                                )}
                            />
                            <Route
                                path="/invitedmembers"
                                exact
                                component={InvitedMembers}
                            />
                            <Route
                                path="/userprofile"
                                exact
                                component={UserProfile}
                            />

                            <Route
                                path="/aboutproject/:projectId"
                                exact
                                render={(props) => (
                                    <AboutProject
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />
                            <Route
                                path="/aboutmember/:memberId"
                                exact
                                render={(props) => (
                                    <AboutMember {...props} members={members} />
                                )}
                            />
                            <Route
                                path="/aboutstudentprofile/:memberId"
                                exact
                                render={(props) => (
                                    <AboutStudentProfile
                                        {...props}
                                        members={members}
                                    />
                                )}
                            />
                            <Route
                                path="/dashboard"
                                exact
                                component={Dashboard}
                            />
                            <Route
                                path="/bookmarkedmembers"
                                exact
                                component={BookmarkedMembers}
                            />
                            <Route
                                path="/bookmarkedprojects"
                                exact
                                render={(props) => (
                                    <BookmarkedProjects
                                        {...props}
                                        projects={projects}
                                    />
                                )}
                            />
                            <Route
                                path="/invitedmembers"
                                exact
                                component={InvitedMembers}
                            />
                            <Route
                                path="/userprofile"
                                exact
                                component={UserProfile}
                            />
                        </Switch>
                    </AnimatePresence>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App
