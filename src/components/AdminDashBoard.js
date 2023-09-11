import React  from "react";
import { Link } from "react-router-dom";
import AverageRating from "./AverageRating";
import ResidentsDetails from "./ResidentsDetails";
import RoomDetails from "./RoomDetails";
import PaymentReminders from "./PaymentReminders";
import PaymentDetails from "./PaymentsDetails";
import PaymentsPieChart from "./PaymentsPieChart";
import RoomPieChart from "./RoomPieChart";

const AdminDashBoard = (props) => {
    return(
        <div>
            <AverageRating />
            <ResidentsDetails />
            <RoomDetails />
            <PaymentReminders />
            <PaymentDetails />
            <Link to="/vacated-residents">Vacated Residents</Link>
            <PaymentsPieChart />
            <RoomPieChart />
        </div>
    )
}

export default AdminDashBoard