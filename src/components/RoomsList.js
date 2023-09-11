import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startShowSelectedRoom , startRemoveRoom} from "../actions/roomActions";

const RoomsList = (props) => {
    // State to control the modal's open/close state
    const [showModal, setShowModal] = useState(false)

    const rooms = useSelector((state) => {
        return state.rooms.rooms
    })

    const sortedRooms = rooms.sort((a, b) => {
        return a.roomNumber - b.roomNumber
    })

    const pgDetailsId = useSelector((state) => {
        return state.pgDetails.pgDetails.map((ele) => ele._id).join(",")
    })

    const selectedRoom = useSelector((state) => {
        return state.rooms.selectedRoom
    })

    const removeRoomError = useSelector((state) => {
        return state.rooms.removeRoomError
    })
    console.log('removeRoomError', removeRoomError)

    const dispatch = useDispatch()

    const handleShowRoom = (roomId) => {
        console.log('roomId-show', roomId)
        dispatch(startShowSelectedRoom(roomId, pgDetailsId))
        setShowModal(true) // Show the modal when a room is selected
    }


    const closeModal = () => {
        setShowModal(false) // Close the modal when needed
    }

    const handleRemoveRoom = (roomId) => {
        console.log('roomId-remove', roomId)
        dispatch(startRemoveRoom(roomId))
    }
    

    return (
        <div>
            <h2>Total Rooms - {rooms.length}</h2>
            {sortedRooms.map((room) => {
                return (
                    <div key={room._id}>
                        <li> Room Number : {room.roomNumber} </li>
                        <button onClick={() => handleShowRoom(room._id)}>Show</button>
                        <button>Edit</button>
                        <button onClick={() => handleRemoveRoom(room._id)}>Remove</button>
                        {room._id === (removeRoomError && removeRoomError.roomId) && (
                            <p style={{ color: "red" }}>{removeRoomError && removeRoomError.message}</p>
                        )}
                    </div>
                )
            })}

            
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                style={{ display: showModal ? "block" : "none" }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="selectedRoomModal"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="selectedRoomModal">
                                Room Details
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedRoom && (
                                <div>
                                    <p> Room Number: {selectedRoom.roomNumber}</p>
                                    <p> Sharing : {selectedRoom.sharing}</p>
                                    <p> Floor : {selectedRoom.floor} </p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                        > Close </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomsList
