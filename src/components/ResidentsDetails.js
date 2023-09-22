import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startGetSingleResident, startRemoveResident } from "../actions/residentsActions"
import { RoleContext } from "./NavBar"
import { useParams, useHistory } from "react-router-dom"
// import AddResident from "./AddResidentForm"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ResidentsDetails = (props) => {
    const { role } = useContext(RoleContext)

    const {pgDetailsId} = useParams()

    const [showModal, setShowModal] = useState(false)
    
    useEffect(()=>{
        dispatch(
            {type : "CLEAR_SELECTED_RESIDENT"}
        )
    }, [])

    const residents = useSelector((state) => state.residents.residents)


    const selectedResident = useSelector((state) => state.residents.selectedResident)
    console.log('selectedResident' , selectedResident)

    const dispatch = useDispatch()

    const handleShowResident = (residentId) => {
        console.log('pgDetailsId-resident-show', pgDetailsId)
        dispatch(startGetSingleResident(pgDetailsId, residentId))
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleRemoveResident = (residentId) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            dispatch(startRemoveResident(pgDetailsId,residentId))
        }
    }

    const history = useHistory() 

    const handleEditResident = (residentId) => {
        // Navigate to the EditResident component with the resident's id as a parameter
        history.push(`/editresident/${pgDetailsId}/${residentId}`)
    }

    return (
        <div>
            {role === 'pg_admin' && (
                <div>
                    <h1>Residents Details</h1>
                    <h2>Total Residents - {residents.length}</h2>
                    <h4>List of Residents</h4>
                    <ul>
                        {residents.map((resident) => (
                            <div key={resident._id}>
                                <img
                                    src={`http://localhost:3800/images/${resident.profileImage}`}
                                    alt="Profile"
                                    width="100"
                                    height="100"
                                />
                                <li> Name: {resident.name}</li>
                                <button onClick={() => handleShowResident(resident._id)}>Show</button>
                                <button onClick={() => handleRemoveResident(resident._id)}>Remove</button>
                                <button onClick={() => handleEditResident(resident._id)}>Edit</button>
                            </div>
                        ))}
                    </ul>
                    <Modal isOpen={showModal} toggle={closeModal}>
                    <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
                    <ModalBody>
                        {selectedResident && (
                        <ul>
                            <li>Name: {selectedResident.name}</li>
                            <li>Email: {selectedResident.email}</li>
                            <li>PhoneNumber: {selectedResident.phoneNumber}</li>
                            <li>Date Of Joining: {selectedResident.dateOfJoining && selectedResident.dateOfJoining.slice(0, 10)}</li>
                            <li>Guardian Name: {selectedResident.guardianName}</li>
                            <li>Guardian Number: {selectedResident.guardianNumber}</li>
                            <li>Address: {selectedResident.address}</li>
                            <ul>
                            Room Details:
                            <li>Sharing: {selectedResident.roomId && selectedResident.roomId.sharing}</li>
                            <li>Room Number: {selectedResident.roomId && selectedResident.roomId.roomNumber}</li>
                            <li>Floor: {selectedResident.roomId && selectedResident.roomId.floor}</li>
                            </ul>
                            {selectedResident.aadharCard && (
                            <div>
                                <p>Aadhar Card:</p>
                                <img
                                src={`http://localhost:3800/images/${selectedResident.aadharCard}`}
                                width="200"
                                height="200"
                                alt="Aadhar"
                                />
                            </div>
                            )}
                        </ul>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={closeModal}>
                        Close
                        </Button>
                    </ModalFooter>
                    </Modal>
                    {/* {editResident && <AddResident editResident={editResident} />} */}
                </div>
            )}
        </div>
    )
}

export default ResidentsDetails
