import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetUnAvailableRooms } from "../actions/roomActions";

const UnAvailableRooms = (props) => {
    const unAvailableRooms = useSelector((state) => {
        return state.rooms.unAvailableRooms
    })
    console.log('unavailable - rooms', unAvailableRooms)
    // Sort the rooms array in ascending order based on roomNumber
    const sortedRooms = unAvailableRooms.sort((a, b) => { 
        //console.log(`Comparing ${a.roomNumber} and ${b.roomNumber}`)
        return a.roomNumber - b.roomNumber
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetUnAvailableRooms())
    }, [dispatch])
    return (
        <div>
            <h3>Un-AvailableRooms - {unAvailableRooms.length}</h3>
            {sortedRooms.map((ele) =>{
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