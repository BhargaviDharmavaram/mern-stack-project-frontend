import React from "react";
import { useSelector } from "react-redux";

const AvailableRooms = (props) => {
    const availableRooms = useSelector((state) => {
        return state.rooms.availableRooms
    })
    //console.log('available - rooms', availableRooms)
    return (
        <div>
            <h3>AvailableRooms - {availableRooms.length}</h3>
            {availableRooms.map((ele) => {
                return(
                    <div key = {ele._id}>
                        <li>Room Number : {ele.roomNumber}</li>
                    </div>
                )
            })}
        </div>
    )
}

export default AvailableRooms