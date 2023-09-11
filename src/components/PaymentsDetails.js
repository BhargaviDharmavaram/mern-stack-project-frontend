import React from "react";
import CompletedPayments from "./CompletedPayments";
import PendingPayments from "./PendingPayments";
import { useSelector } from "react-redux";

const PaymentDetails = (props) => {
    const completedPaymentsTotal = useSelector((state)=>{
        return state.payments.completedPaymentsTotal
    })
    console.log('completed-total', completedPaymentsTotal)
    const pendingPaymentsTotal = useSelector((state)=>{
        return state.payments.pendingPaymentsTotal
    })
    console.log('pending-total', pendingPaymentsTotal)

    return (
        <div>
            <h1>Payment Details</h1>
            <p>Completed Payments Amount - {completedPaymentsTotal}</p>
            <p>Pending Payments Amount - {pendingPaymentsTotal}</p>
            <CompletedPayments />
            <PendingPayments />
        </div>
    )
}
export default PaymentDetails