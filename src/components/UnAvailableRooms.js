import React from "react";
import { useSelector } from "react-redux";

const UnAvailableRooms = (props) => {
    const unAvailableRooms = useSelector((state) => {
        return state.rooms.unAvailableRooms
    })
    console.log('unavailable - rooms', unAvailableRooms)
    return (
        <div>
            <h3>Un-AvailableRooms - {unAvailableRooms.length}</h3>
            {unAvailableRooms.map((ele) =>{
                return(
                    <div key = {ele._id}>
                        <li>Room Number : {ele.roomNumber}</li>
                    </div>
                )
            })}
        </div>
    )
}

export default UnAvailableRooms