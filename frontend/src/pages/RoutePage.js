import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import Dashboard from './Dashboard'
import AddPage from './AddPage'
import EditPage from './EditPage'
import Preview from './Preview'

function RoutePage() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route path="write" element={<AddPage/>}/>
                <Route path="edit/:id" element={<EditPage/>}/>
                <Route path="preview/:page" element={<Preview/>}/>
            </Routes>
        </Router>
    )
}

export default RoutePage;