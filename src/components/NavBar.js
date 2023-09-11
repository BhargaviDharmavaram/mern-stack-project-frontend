import React, {createContext} from "react"
import {Link, Route, withRouter} from 'react-router-dom'
import Swal from "sweetalert2"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Account from "./Account"
import AddPG from "./CreatePgForm"
import AddRoom from "./AddRoomForm"
import AddResident from "./AddResidentForm"
import ConfirmResident from "./ConfirmResident"
import AdminDashBoard from "./AdminDashBoard"
<<<<<<< Updated upstream
import PaymentPage from "./PaymentPage"
=======
import ResidentDashBoard from "./ResidentDashboard"
>>>>>>> Stashed changes

export const RoleContext = createContext()

const NavBar = (props) => {
    const {userLoggedIn, handleAuth, role} = props

    const handleLogout = () => {
        // Use SweetAlert2 for logout confirmation
        Swal.fire({
            title: "Logout",
            text: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed logout
                // For removing token from local storage
                localStorage.removeItem('token')
    
                // For logout the user
                handleAuth()
    
                Swal.fire({
                    title: "Logged out successfully!",
                    icon: "success",
                    showConfirmButton: false,
                })
    
                // Navigate only after confirmation
                props.history.push('/')
            }
        })
    }
    
    return(
        <div>
            <RoleContext.Provider value = {{role, userLoggedIn}}>
                <li><Link to = "/"> Home </Link> </li>
                {userLoggedIn ? 
                    <React.Fragment>
                        <li> <Link to = "/account"> Account </Link> </li>
                        <li> <Link onClick = {handleLogout} > Logout </Link> </li>
                        { role === 'pg_admin' ? <div> 
                            <li> <Link to = '/addpg'> AddPG </Link> </li>
                            <li> <Link to = '/addroom'> AddRoom </Link>  </li>
                            <li> <Link to = '/addresident'> AddResident </Link></li> 
                            <li> <Link to = '/admindashboard'>AdminDashBoard</Link> </li>
                        </div> : <div>
                            <li> <Link to = '/residentdashboard'>AdminDashBoard</Link> </li>
                            <li> <Link to = '/confirm'>ConfirmResident</Link>  </li>
                            <li> <Link to="/payment/:razorPayId"> PaymentPage </Link> </li>
                        </div>
                        }
                    </React.Fragment> : <React.Fragment>
                        <li> <Link to = "/register"> Register</Link> </li>
                        <li> <Link to = "/login"> Login </Link> </li>
                    </React.Fragment>
                }

                <Route path = "/" component = {Home} exact = {true} />
                <Route path = "/register" component = {Register} />
                <Route path = "/login"  render = {(props)=>{
                        return <Login 
                            {...props}
                            handleAuth = {handleAuth}
                        />
                    }} />
                <Route path = '/account' component={Account} />
                <Route path = '/addpg' component = {AddPG}/>
                <Route path = '/addroom' component = {AddRoom} />
                <Route path = '/addresident' component = {AddResident} />
                <Route path = "/confirm" component={ConfirmResident} />
                <Route path="/payment/:razorPayId" component = {PaymentPage} />
                <Route path = '/admindashboard' component = {AdminDashBoard} />
                <Route path = '/residentdashboard' component = {ResidentDashBoard} />
            </RoleContext.Provider>
        </div>
    )
}

export default withRouter(NavBar)