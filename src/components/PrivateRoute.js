import React from "react";
import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom";
const PrivateRoute = ({component : Component , ...rest}) => {
    return(
        <Route
            {...rest}
            render = {(props)=>{
                return localStorage.getItem('token') ? (
                    <Component
                        {...props}
                    /> 
                    ) : (
                        <Redirect 
                            to = {{pathname : "/login"}}
                        />
                    )
            }}
        />
    )

}
export default PrivateRoute

// inside the render in return i can use the condition like localStorage.getItem('token') ? <Component {...props}/> : <Redirect to ={{pathname : "/login"}} /> 
// or else based on the state variable userLOggedIn im checking the condition like if true then render Component else redirect to login page