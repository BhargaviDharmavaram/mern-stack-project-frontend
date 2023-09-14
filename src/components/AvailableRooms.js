import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { startGetAvailableRooms } from "../actions/roomActions";

const AvailableRooms = (props) => {
    const availableRooms = useSelector((state) => {
        return state.rooms.availableRooms
    })
    //console.log('available - rooms', availableRooms)
    // Sort the rooms array in ascending order based on roomNumber
    const sortedRooms = availableRooms.sort((a, b) => { 
        //console.log(`Comparing ${a.roomNumber} and ${b.roomNumber}`)
        return a.roomNumber - b.roomNumber
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetAvailableRooms())
    }, [dispatch])
    
    return (
        <div>
            <h3>AvailableRooms - {availableRooms.length}</h3>
            {sortedRooms.map((ele) => {
                return(
                    <div key = {ele._id}>
                        <li key = {ele._id}>Room Number : {ele.roomNumber}</li>
                    </div>
                )
            })}
        </div>
    )
}

export default AvailableRooms