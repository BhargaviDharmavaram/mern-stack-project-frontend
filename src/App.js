import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { startGetAdminPgDetails, startGetListOfPgs } from './actions/pgDetailsActions';
import { startGetResidents } from './actions/residentsActions';
import { startGetAllRooms, startGetAvailableRooms, startGetUnAvailableRooms } from './actions/roomActions';
import {
  startGetCompletedPayments,
  startGetCompletedPaymentsTotal,
  startGetPendingPayments,
  startGetPendingPaymentsTotal,
} from './actions/paymentActions';
import { startGetAllReviewsForPGAdmin } from './actions/reviewRatingActions';

const App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    const handleAuth = () => {
      setUserLoggedIn(!userLoggedIn)
    }


    useEffect(() => {
        if (userLoggedIn) {
            const token = localStorage.getItem('token')
            const decoded = jwt_decode(token)
            const userRole = decoded.role
            setRole(userRole)

            if (userRole === 'pg_admin'){ 
                dispatch(startGetAdminPgDetails())
                dispatch(startGetResidents())
                dispatch(startGetAllRooms())
                dispatch(startGetAvailableRooms())
                dispatch(startGetUnAvailableRooms())
                dispatch(startGetCompletedPayments())
                dispatch(startGetPendingPayments())
                dispatch(startGetCompletedPaymentsTotal())
                dispatch(startGetPendingPaymentsTotal())  
                dispatch(startGetAllReviewsForPGAdmin())   
            }
            if (userRole === 'pg_resident') {
                dispatch(startGetListOfPgs())
            }
        }
    }, [dispatch, userLoggedIn])

    return (
        <div>
        <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} role={role} />
        </div>
    )
}

export default App


