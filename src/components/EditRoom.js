import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { startEditRoom } from "../actions/roomActions";

const EditRoom = (props) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const { selectedRoom, pgDetailsId } = props

    const [roomNumber, setRoomNumber] = useState(selectedRoom.roomNumber)
    const [sharing, setSharing] = useState(selectedRoom.sharing)
    const [floor, setFloor] = useState(selectedRoom.floor)

    const handleSave = () => {
        // Create an object with the updated room data
        const updatedRoom = {
        roomNumber,
        sharing,
        floor,
        }
        console.log(updatedRoom)
        const reset = () => {
            // Reset the form fields
            setRoomNumber("")
            setSharing("")
            setFloor("")
        }
        
        dispatch(startEditRoom(selectedRoom._id, pgDetailsId , updatedRoom, reset))
        // Redirect to the admin dashboard
        history.push(`/admindashboard/${pgDetailsId}`)
    }

    const handleCancel = () => {
        // Redirect to the admin dashboard of the selected PG when cancel is clicked
        history.push(`/admindashboard/${pgDetailsId}`)
    }

    return (
        <div>
        {/* <h2>Edit Room</h2> */}
        <form>
            <div>
            <label>Room Number:</label>
            <input
                type="text"
                name="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
            />
            </div>
            <div>
            <label>Sharing:</label>
            <input
                type="text"
                name="sharing"
                value={sharing}
                onChange={(e) => setSharing(e.target.value)}
            />
            </div>
            <div>
            <label>Floor:</label>
            <input
                type="text"
                name="floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
            />
            </div>
            <button type="button" onClick={handleSave}> Save </button>
            <button type="button" onClick={handleCancel}> Cancel </button>
        </form>
        </div>
    )
}

export default EditRoom
