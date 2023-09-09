import React, {useState, useEffect} from 'react'
//import PaymentPage from './paymentPage'
//import {Link, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { startAdminGetPgDetails } from './actions/pgDetailsActions'
import { startGetResidents } from './actions/residentsActions'
import { startGetAllRooms, startGetAvailableRooms, startGetUnAvailableRooms } from './actions/roomActions'

const  App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn)
    }
    useEffect(()=>{
        if(userLoggedIn){
          const token = localStorage.getItem('token')
          console.log(token.split(' ')[1])
          const decoded = jwt_decode(token)
          console.log(decoded)
          console.log(decoded.role)
          setRole(decoded.role)  
        }
    }, [userLoggedIn])


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startAdminGetPgDetails())
        dispatch(startGetResidents())
        dispatch(startGetAllRooms())
        dispatch(startGetAvailableRooms())
        dispatch(startGetUnAvailableRooms())
    }, [dispatch])
    return(
        <div>
            {/* <Link to="/payment/:razorPayId"> PaymentPage </Link>

            <Route path="/payment/:razorPayId" component = {PaymentPage} /> */}


            <NavBar userLoggedIn = {userLoggedIn} handleAuth = {handleAuth} role = {role} />
        </div>
    )
  
}

export default App
