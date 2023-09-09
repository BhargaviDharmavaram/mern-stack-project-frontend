import React, {useReducer,useState} from "react"
import validator from "validator"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startRegisterUser } from "../actions/usersActions"

const Register = (props) => {
    const dispatch = useDispatch()
    const [formErrors, setFormErrors] = useState({})
    const reducer = (state, action) => {
        switch(action.type){
            case "USER_INFO":
                return { ...state, [action.field]: action.value }
            case "RESET_FORM":
                return { ...initialState }
            default:
            // If the action type doesn't match any defined cases, return the current state
            return state
        }
    }
    
    const initialState = {
        username : '',
        email : '',
        password : '',
        role : ''
    }
    const [state, userDispatch] = useReducer(reducer, initialState)

    const handleInputChange = (field) =>(e) => {
        userDispatch({type : "USER_INFO", field , value : e.target.value})
    }

    const validateForm = () => {
        const errors = {}
        if (!state.username.trim()) {
            errors.username = "Username is required"
        }
    
        if(state.email.trim().length === 0){
            errors.email = 'Email is required'
        }
        else if(!validator.isEmail(state.email)){
            errors.email = 'Invalid email format'
        }
        
        if(state.password.trim().length === 0) {
            errors.password = 'Password is required'
        }
        else if(!validator.isStrongPassword(state.password)){
            errors.password = 'minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 1'
        }

    
        if (!state.role.trim()) {
            errors.role = "Role selection is required"
        }
    
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            const formData = {
                username: state.username,
                email: state.email,
                password: state.password,
                role: state.role,
            }
            console.log("formData", formData)
            try {
                await dispatch(startRegisterUser(formData))
                // Clear the form fields and reset form errors upon successful registration
                userDispatch({ type: 'RESET_FORM' })
                setFormErrors({})
                // Show a success alert using SweetAlert2 with the backend message
                Swal.fire({
                  icon: 'success',
                  title: 'Registration Successful!',
                  text: 'Thank you for registering with us. Check your email for login details.'
                })
                props.history.push('/login')
            }
            catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Registration Error',
                  text: 'An error occurred during registration. Please try again later.',
                })
            }
        }
    }

return (
    <div>
        <h1>Register With Us</h1>
        <form onSubmit={handleSubmit}>
            <label>Username</label><br />
            <input
                type="text"
                name="username"
                placeholder="Enter the username"
                value={state.username}
                onChange={handleInputChange('username')}
            />
            <br />
            {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}

            <label>Email</label><br />
            <input
                type="text"
                name="email"
                placeholder="Enter the email"
                value={state.email}
                onChange={handleInputChange('email')}
            />
            <br />
            {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

            <label>Password</label><br />
            <input
                type="password"
                name="password"
                placeholder="Enter the password"
                value={state.password}
                onChange={handleInputChange('password')}
            />
            <br />
            {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}

            <label>Select Role</label><br />
            <select name="role" onChange={handleInputChange('role')} value={state.role}>
                <option value="">Select Role</option>
                <option value="pg_admin">Pg Admin</option>
                <option value="pg_resident">Pg Resident</option>
            </select>
            <br />
            {formErrors.role && <p style={{ color: "red" }}>{formErrors.role}</p>}
            <br />
            <button type="submit">Register</button>
            <h4>Already have an account? Login here  <Link to = '/login'>Login</Link> </h4>
      </form>
    </div>
  )
}

export default Register