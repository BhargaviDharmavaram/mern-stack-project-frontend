import React from "react";
import RoomsList from "./RoomsList";
import AvailableRooms from "./AvailableRooms";
import UnAvailableRooms from "./UnAvailableRooms";

const RoomDetails = (props) => {
    return (
        <div>
            <h1>Room Details</h1>
            <RoomsList />
            <AvailableRooms />
            <UnAvailableRooms />
        </div>
    )
}

export default RoomDetails