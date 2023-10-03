import React, { useReducer, useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../actions/usersActions";

const Register = (props) => {
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const reducer = (state, action) => {
        switch (action.type) {
        case "USER_INFO":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return { ...initialState };
        default:
            // If the action type doesn't match any defined cases, return the current state
            return state;
        }
    };

    const initialState = {
        username: "",
        email: "",
        password: "",
        role: "",
    };
    const [state, userDispatch] = useReducer(reducer, initialState);

    const handleInputChange = (field) => (e) => {
        userDispatch({ type: "USER_INFO", field, value: e.target.value });
    };

    const validateForm = () => {
        const errors = {};
        if (!state.username.trim()) {
        errors.username = "Username is required";
        }

        if (state.email.trim().length === 0) {
        errors.email = "Email is required";
        } else if (!validator.isEmail(state.email)) {
        errors.email = "Invalid email format";
        }

        if (state.password.trim().length === 0) {
        errors.password = "Password is required";
        } else if (!validator.isStrongPassword(state.password)) {
        errors.password =
            "minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 1";
        }

        if (!state.role.trim()) {
        errors.role = "Role selection is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
        const formData = {
            username: state.username,
            email: state.email,
            password: state.password,
            role: state.role,
        };
        console.log("formData", formData);
        try {
            await dispatch(startRegisterUser(formData));
            // Clear the form fields and reset form errors upon successful registration
            userDispatch({ type: "RESET_FORM" });
            setFormErrors({});
            // Show a success alert using SweetAlert2 with the backend message
            Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "Thank you for registering with us. Check your email for login details.",
            });
            props.history.push("/login");
        } catch (error) {
            Swal.fire({
            icon: "error",
            title: "Registration Error",
            text: "An error occurred during registration. Please try again later.",
            });
        }
        }
    };

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <h1 className="text-center" style={{
                    color : '#CB1A80', 
                    transition: '0.3s', 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', //  text shadow
                    fontStyle: 'italic'
                }}>Register With Us</h1>
                <div className="card">
                    <div className="card-body text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label> <span style={{ color: 'red' }}>*</span>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter the username"
                                        value={state.username}
                                        onChange={handleInputChange("username")}
                                        className="form-control"
                                    /> 
                                    {formErrors.username && (
                                        <p style={{ color: "red" }}>{formErrors.username}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>  <span style={{ color: 'red' }}>*</span>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter the email"
                                        value={state.email}
                                        onChange={handleInputChange("email")}
                                        className="form-control"
                                    /> 
                                    {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Password</label> <span style={{ color: 'red' }}>*</span> 
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

                                <div className="form-group">
                                    <label>Select Role</label>  <span style={{ color: 'red' }}>*</span>
                                    <select
                                        name="role"
                                        onChange={handleInputChange("role")}
                                        value={state.role}
                                        className="form-control"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="pg_admin">Pg Admin</option>
                                        <option value="pg_resident">Pg Resident</option>
                                    </select> 
                                    {formErrors.role && <p style={{ color: "red" }}>{formErrors.role}</p>}
                                </div> 

                                <div className="text-center">
                                    <button type="submit" style={{
                                        margin: '5px',
                                        padding: '10px',
                                        backgroundColor: '#64B2E4',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px'
                                    }}>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> 
            <h4 className="text-center">
                Already have an account? Login here <Link to="/login">Login</Link>
            </h4>
            </div>
        </div>
        </div>
    )
}

export default Register
