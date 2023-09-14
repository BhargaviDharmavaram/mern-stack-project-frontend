import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import AverageRating from "./AverageRating";
import ResidentsDetails from "./ResidentsDetails";
import RoomDetails from "./RoomDetails";
import PaymentReminders from "./PaymentReminders";
import PaymentDetails from "./PaymentsDetails";
import PaymentsPieChart from "./PaymentsPieChart";
import RoomPieChart from "./RoomPieChart";
import AdminProfilePage from "./AdminProfilePage";
import { RoleContext } from "./NavBar";

const AdminDashBoard = (props) => {
    const {role} = useContext(RoleContext)
    return(
        <div>
            {role === 'pg_admin' && 
                <div>
                    <AdminProfilePage />
                    <AverageRating />
                    <ResidentsDetails />
                    <RoomDetails />
                    <PaymentReminders />
                    <PaymentDetails />
                    <Link to="/vacated-residents">Vacated Residents</Link>
                    <PaymentsPieChart />
                    <RoomPieChart />
                </div>
                }
        </div>
    )
}

export default AdminDashBoard