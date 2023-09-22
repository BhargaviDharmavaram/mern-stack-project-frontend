import React from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { startShowSelectedRoom } from "../actions/roomActions";
import EditRoom from "./EditRoom";

function EditRoomPage() {
    const { pgDetailsId, roomId } = useParams()
    const rooms = useSelector((state)=>{
        return state.rooms.rooms
    })
    console.log('rooms', rooms)
    const filterRoom = rooms.find((ele)=>{
        return ele._id === roomId
    })
    console.log(filterRoom)
    //const selectedRoom = useSelector(state => (state.rooms.selectedRoom))
    //console.log(selectedRoom)

    //const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(startShowSelectedRoom(roomId, pgDetailsId))
    // },[dispatch,pgDetailsId,roomId])
    
    // console.log(pgDetailsId, roomId)

    // useEffect(()=>{
    //     return function(){
    //         dispatch({
    //             type : "CLEAR_SELECTED_ROOM"
    //         })
    //     }
    // },[dispatch])

    return (
        <div>
        <h2>Edit Room</h2>
        <EditRoom selectedRoom={filterRoom} pgDetailsId={pgDetailsId} />
        </div>
    )
}

export default EditRoomPage;
