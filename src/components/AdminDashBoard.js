import React  from "react";
import AverageRating from "./AverageRating";
import ResidentsDetails from "./ResidentsDetails";
import RoomDetails from "./RoomDetails";

const AdminDashBoard = (props) => {
    return(
        <div>
            <AverageRating/>
            <ResidentsDetails/>
            <RoomDetails/>
        </div>
    )
}

export default AdminDashBoard