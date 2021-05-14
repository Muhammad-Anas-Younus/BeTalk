import React, {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthContext from './context/AuthContext'

function PrivateRoute({component: Component, ...rest}) {
    const {loggedIn} = useContext(AuthContext)
    return (
        <Route
        {...rest}
        render={props => !loggedIn ? (
            <Redirect to="/login"/>
        ) : (
            <Component {...props}/>
        )}
        />
    )
}

export default PrivateRoute
