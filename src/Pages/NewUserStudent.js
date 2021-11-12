import React from 'react'
import '../Styles/SignIn.css'
import Button from '@mui/material/Button'
import beaker from '../Images/blackLinedBeakerBgRemoved.png'
import { Link } from 'react-router-dom'

function NewUserStudent() {
    //     const [, setProjects] = useState([])
    //     const projectsCollectionRef = collection(db, 'projects')
    //     useEffect(() => {
    //         const getProjects = async () => {
    //             const data = await getDocs(projectsCollectionRef)
    //             //loop through documents in collection
    //             console.log(data)
    //             console.log('things show up')
    //             setProjects(
    //                 data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
    //             )
    //         }
    //         getProjects()
    //     }, [])

    return (
        <div className="sign-in">
            <div className="top-signin">
                <img src={beaker} alt="logo" />
                <h1>New User</h1>
                <p className="signin">Login Information</p>
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
                    <Link className="button-link" to="/studentprofile">
                        <Button
                            className="btn1"
                            size="medium"
                            variant="outlined"
                            color="secondary"
                        >
                            Continue to Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewUserStudent
