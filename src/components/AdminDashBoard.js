import React  from "react";
import AverageRating from "./AverageRating";
import ResidentsDetails from "./ResidentsDetails";
import RoomDetails from "./RoomDetails";
import PaymentReminders from "./PaymentReminders";
import PaymentDetails from "./PaymentsDetails";

const AdminDashBoard = (props) => {
    return(
        <div>
            <AverageRating />
            <ResidentsDetails />
            <RoomDetails />
            <PaymentReminders />
            <PaymentDetails />

        </div>
    )
}

export default AdminDashBoard