import {Route,Redirect} from "react-router-dom"
import { Children, useContext } from "react"
import AuthContext from "../context/AuthContext"


const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return (
        <Route {...rest} render={() => {
            return user ? children : <Redirect to="/login"/>
        }}/>
    )

}