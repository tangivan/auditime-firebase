import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth()

    return (
        <Route>
            {currentUser ? children : <Redirect to='/login' />}
        </Route >
    )
}

export default PrivateRoute;