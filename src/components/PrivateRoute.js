import React from "react";
import { Route } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={(props) => {
            if (localStorage.getItem("token")) {
                return <Component {...props} />
            } 
            else {
                Swal.fire({
                    icon: "warning",
                    title: "Login Required",
                    text: "You need to login to access this page.",
                    confirmButtonText: "Login",
                }).then(() => {
                    // Redirect to the login page
                    props.history.push("/login")
                })
            }
        }}
        />
    )
}

export default PrivateRoute


// inside the render in return i can use the condition like localStorage.getItem('token') ? <Component {...props}/> : <Redirect to ={{pathname : "/login"}} /> 
// or else based on the state variable userLOggedIn im checking the condition like if true then render Component else redirect to login page