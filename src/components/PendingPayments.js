import React from "react";
import { useSelector } from "react-redux";

const PendingPayments = (props) => {
    const pendingPayments = useSelector((state)=>{
        return state.payments.pendingPayments
    })
    console.log('pending-payments', pendingPayments)
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