import React, { useEffect } from "react";
import CompletedPayments from "./CompletedPayments";
import PendingPayments from "./PendingPayments";
import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { startGetCompletedPaymentsTotal, startGetCompletedPayments, startGetPendingPayments, startGetPendingPaymentsTotal } from "../actions/paymentActions";

const PaymentDetails = (props) => {
    const {pgDetailsId} = useParams()
    const completedPaymentsTotal = useSelector((state)=>{
        return state.payments.completedPaymentsTotal
    })
    console.log('completed-total', completedPaymentsTotal)
    const pendingPaymentsTotal = useSelector((state)=>{
        return state.payments.pendingPaymentsTotal
    })
    console.log('pending-total', pendingPaymentsTotal)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetCompletedPayments(pgDetailsId))
        dispatch(startGetPendingPayments(pgDetailsId))
        dispatch(startGetCompletedPaymentsTotal(pgDetailsId))
        dispatch(startGetPendingPaymentsTotal(pgDetailsId))
    }, [dispatch,pgDetailsId])

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