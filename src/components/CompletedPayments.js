import React from "react";
import { useSelector } from "react-redux";

const CompletedPayments = (props) => {
    const completedPayments = useSelector((state)=>{
        return state.payments.completedPayments
    })
    console.log('completed-payments', completedPayments)
    return (
        <div>
            <h3>Completed Payments - {completedPayments.length} </h3>
            {completedPayments.map((ele)=>{
                return(
                    <div key={ele._id}> 
                        <li> Resident Name : {ele.residentId && ele.residentId.name} - Amount : {ele.amount} </li>
                    </div>
                )
            })}
        </div>
    )
}
export default CompletedPayments