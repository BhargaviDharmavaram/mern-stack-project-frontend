import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import { startShowSelectedRoom , startRemoveRoom, startGetAllRooms} from "../actions/roomActions";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";


const RoomsList = (props) => {

    const {pgDetailsId} = useParams()

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(()=>{
        dispatch(startGetAllRooms(pgDetailsId))
    }, [dispatch, pgDetailsId])


    // State to control the modal's open/close state
    const [showModal, setShowModal] = useState(false)
    const rooms = useSelector((state) => {
        return state.rooms.rooms
    })

    const sortedRooms = rooms.sort((a, b) => {
        return a.roomNumber - b.roomNumber
    })

    const selectedRoom = useSelector((state) => {
        return state.rooms.selectedRoom
    })

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
        dispatch(startRemoveRoom(roomId, pgDetailsId))
    }
    
    const handleEditRoom = (roomId) => {
        // Navigate to the edit page with roomId as a route parameter
        history.push(`/edit-room/${pgDetailsId}/${roomId}`)
    }
    return (
        <div>
            <h2>Total Rooms - {rooms.length}</h2>
            {sortedRooms.map((room) => {
                return (
                    <div key={room._id}>
                        <li key={room._id}> Room Number : {room.roomNumber} </li>
                        <button onClick={() => handleShowRoom(room._id)}>Show</button>
                        <button onClick={() => handleEditRoom(room._id)}>Edit</button>
                        <button onClick={() => handleRemoveRoom(room._id)}>Remove</button>
                    </div>
                )
            })}

            
            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Room Details</ModalHeader>
                <ModalBody>
                    {selectedRoom && (
                    <div>
                        <p>Room Number: {selectedRoom.roomNumber}</p>
                        <p>Sharing: {selectedRoom.sharing}</p>
                        <p>Floor: {selectedRoom.floor}</p>
                    </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeModal}>
                    Close
                    </Button>
                </ModalFooter>
            </Modal>
            {/* {editingRoom && (
            <EditRoom
                selectedRoom={editingRoom}
                onCancel={handleCancelEdit}
            />
            )} */}
        </div>
    )
}

export default RoomsList
