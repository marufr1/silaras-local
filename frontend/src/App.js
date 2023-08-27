import Axios from "axios"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import AdminLayout from "./layouts/Admin"

const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common[`${process.env.REACT_APP_KEY_HEADER}`] = token
}

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Redirect from="/" to="/admin/files" />
            </Switch>
        </BrowserRouter>
    )
}

export default App