import React, { useContext, useEffect }  from "react";
import { Link } from "react-router-dom";
import AverageRating from "./AverageRating";
import ResidentsDetails from "./ResidentsDetails";
import RoomDetails from "./RoomDetails";
import PaymentReminders from "./PaymentReminders";
import PaymentDetails from "./PaymentsDetails";
import PaymentsPieChart from "./PaymentsPieChart";
import RoomPieChart from "./RoomPieChart";
import { RoleContext } from "./NavBar";
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { startGetAllReviewsForPGAdmin } from "../actions/reviewRatingActions";
import { startGetCompletedPayments, startGetCompletedPaymentsTotal, startGetPendingPayments, startGetPendingPaymentsTotal } from "../actions/paymentActions";

const AdminDashBoard = (props) => {
    const {role} = useContext(RoleContext)
    const {pgDetailsId} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetAllReviewsForPGAdmin(pgDetailsId))
        dispatch(startGetCompletedPayments(pgDetailsId))
        dispatch(startGetPendingPayments(pgDetailsId))
        dispatch(startGetCompletedPaymentsTotal(pgDetailsId))
        dispatch(startGetPendingPaymentsTotal(pgDetailsId))
    })
    
    return(
        <div>
            {role === 'pg_admin' && 
                <div>
                    <h4>AdminDashBoard</h4>
                    <Link to = {`/addroom/${pgDetailsId}`}>Add Room</Link>
                    <br />
                    <Link to = {`/addresident/${pgDetailsId}`}>Add Resident</Link>
                    <AverageRating />
                    <ResidentsDetails />
                    <RoomDetails />
                    <PaymentReminders />
                    <PaymentDetails />
                    <Link to={`/vacated-residents/${pgDetailsId}`}>Vacated Residents</Link>
                    <PaymentsPieChart />
                    <RoomPieChart />
                </div>
                }
        </div>
    )
}

export default AdminDashBoard