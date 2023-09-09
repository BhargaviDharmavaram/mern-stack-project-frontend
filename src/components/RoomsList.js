import React from "react";
import { useSelector } from "react-redux";

const RoomsList = (props) => {
    const rooms = useSelector((state) => {
        return state.rooms.rooms
    })
    console.log('rooms', rooms)
    // Sort the rooms array in ascending order based on roomNumber
    const sortedRooms = rooms.sort((a, b) => { 
        console.log(`Comparing ${a.roomNumber} and ${b.roomNumber}`)
        return a.roomNumber - b.roomNumber
    })

    console.log('rooms', sortedRooms)
    return (
        <div> 
            <h2>Total Rooms - {rooms.length} </h2>
            {sortedRooms.map((ele) => {
                return(
                    <div key = {ele._id}>
                        <li> Room Number : {ele.roomNumber} </li>
                        <button>Show</button>
                        <button>Edit</button>
                        <button>Remove</button>
                    </div>
                )
            })}
        </div>
    )
}

export default RoomsList
