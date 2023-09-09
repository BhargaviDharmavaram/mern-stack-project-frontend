import React, {useReducer,useState} from "react"
import { Link } from "react-router-dom"
import validator from "validator"
import axios from 'axios'
import Swal from "sweetalert2"
const Login = (props) => {
    const [formErrors, setFormErrors] = useState({})
    const reducer = (state, action) => {
        switch(action.type){
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
        email : '',
        password : '',
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInputChange = (field) =>(e) => {
        dispatch({type : "LOGIN_INFO", field , value : e.target.value})
    }

    const validateForm = () => {
        const errors = {}
        
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
            errors.password = 'Invalid password'
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
            const login = await axios.post("http://localhost:3800/api/users/login",formData)
            const loginToken = login.data
            console.log('login-token', loginToken.token)
            localStorage.setItem('token', loginToken.token)
            props.history.push('/')
            props.handleAuth()
            
            setFormErrors({})

            Swal.fire({
                icon : 'success',
                title : 'Welcome back!',
                text : 'You have successfully logged in.'
            })
        } catch (error) {
            console.error("Error:", error)
            Swal.fire({
                icon : 'error',
                title : 'Oops....',
                text : 'Something went wrong! Please try again later.'
            })
        }
        dispatch({type : "RESET_FORM"})
    }
}

return (
    <div>
        <h1>Welcome Back</h1>
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
            <h4>Don't have an account? Register here <Link to = '/register'>Register</Link></h4>
      </form>
    </div>
  )
}

export default Login