import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetPendingPayments } from "../actions/paymentActions";

const PendingPayments = (props) => {
    const pendingPayments = useSelector((state)=>{
        return state.payments.pendingPayments
    })
    console.log('pending-payments', pendingPayments)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetPendingPayments())
    }, [dispatch])
    return (
        <div>
            <h3>Pending Payments - {pendingPayments.length} </h3>
            {pendingPayments.map((ele)=>{
                return(
                    <div key={ele._id}>
                        <li> Resident Name : {ele.residentId && ele.residentId.name} - Amount : {ele.amount} </li>
                    </div>
                )
            })}
        </div>
    )
}
export default PendingPayments