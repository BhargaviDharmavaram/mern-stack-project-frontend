import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import Swal from "sweetalert2";

const Login = (props) => {
    const [formErrors, setFormErrors] = useState({})
    const reducer = (state, action) => {
        switch (action.type) {
        case "LOGIN_INFO":
            return { ...state, [action.field]: action.value }
        case "RESET_FORM":
            return { ...initialState }
        default:
            // If the action type doesn't match any defined cases, return the current state
            return state
        }
    }

    const initialState = {
        email: "",
        password: "",
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInputChange = (field) => (e) => {
        dispatch({ type: "LOGIN_INFO", field, value: e.target.value })
    }

    const validateForm = () => {
        const errors = {}

        if (state.email.trim().length === 0) {
        errors.email = "Email is required"
        } else if (!validator.isEmail(state.email)) {
        errors.email = "Invalid email format"
        }

        if (state.password.trim().length === 0) {
        errors.password = "Password is required"
        } else if (!validator.isStrongPassword(state.password)) {
        errors.password = "Invalid password"
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
        const formData = {
            email: state.email,
            password: state.password,
        }
        console.log("formData", formData)
        try {
            const login = await axios.post(
            "http://localhost:3800/api/users/login",
            formData
            )
            const loginToken = login.data
            console.log("login-token", loginToken.token)
            localStorage.setItem("token", loginToken.token)
            props.history.push("/")
            props.handleAuth()

            setFormErrors({})

            Swal.fire({
            icon: "success",
            title: "Welcome back!",
            text: "You have successfully logged in.",
            })
        } catch (error) {
            console.error("Error:", error)
            Swal.fire({
            icon: "error",
            title: "Oops....",
            text: "Something went wrong! Please try again later.",
            })
        }
        dispatch({ type: "RESET_FORM" })
        }
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <h1 className="text-center" 
            style={{
                color : '#CB1A80', 
                transition: '0.3s', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', //  text shadow
                fontStyle: 'italic'
            }}>Welcome Back</h1>
            <h2 className="text-center" 
                style={{
                    color : '#FF970F', 
                    fontStyle: 'italic'
            }}>Login to your account</h2>
            <div className="card">
                <div className="card-body text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label>Email</label> <span style={{ color: 'red' }}>*</span>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter the email"
                            value={state.email}
                            onChange={handleInputChange("email")}
                            className="form-control"
                        /> 
                        {formErrors.email && (
                            <p style={{ color: "red" }}>{formErrors.email}</p>
                        )}
                        </div>

                        <div className="form-group">
                        <label>Password</label><span style={{ color: 'red' }}>*</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter the password"
                            value={state.password}
                            onChange={handleInputChange("password")}
                            className="form-control"
                        />  
                        {formErrors.password && (
                            <p style={{ color: "red" }}>{formErrors.password}</p>
                        )}
                        </div>
                        
                        <div className="text-center">
                        <button
                            type="submit"
                            style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: '#64B2E4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px'
                            }}> Login 
                        </button>
                        </div>
                    </form>
                </div>
            </div> 
            <h4 className="text-center">
                Don't have an account? Register here{" "}
                <Link to="/register">Register</Link>
            </h4>
            </div>
        </div>
        </div>
    )
}

export default Login
