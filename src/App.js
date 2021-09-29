import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage'
import Lookingpage from './Pages/Lookingpage'
function App() {
    return (
        <>
            <Router>
                {/* <Navbar /> */}
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
