import * as React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'
import Lookingpage from './Pages/Lookingpage'
function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage} />

                    <Route path="/lookingpage" exact component={Lookingpage} />
                </Switch>
            </Router>
        </>
        // <Button variant="contained">Hello World</Button>
    )
}

export default App
