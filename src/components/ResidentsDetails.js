import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetSingleResident , startRemoveResident } from "../actions/residentsActions";
import { RoleContext } from "./NavBar";

const ResidentsDetails = (props) => {
    const {role} = useContext(RoleContext)
    //showModal - state variable is used to determine whether the modal should be displayed (true) or hidden (false)
    const [showModal, setShowModal] = useState(false)

    const residents = useSelector((state) => {
        return state.residents.residents
    })
    console.log('residents', residents)

    const pgDetailsId = useSelector((state) => {
        return state.pgDetails.pgDetails.map((ele) => ele._id).join(',')
    })
    
    console.log("PgDetailsId", pgDetailsId)

    const selectedResident = useSelector((state) => {
        return state.residents.selectedResident
    })
    console.log('selectedResident' , selectedResident)

    const dispatch = useDispatch()

    const handleShowResident = (residentId) => {
        //console.log('residentId-show', residentId)
        //console.log('pgId-show', pgDetailsId)
        dispatch(startGetSingleResident(pgDetailsId, residentId))
        setShowModal(true) // Open the modal when the show button is clicked
    }

    const closeModal = () => {
        setShowModal(false) // Close the modal
    }

    const handleEditResident = (residentId) => {
        console.log('residentId-edit', residentId)
        // dispatch(startEditResident(residentId))
    }

    const handleRemoveResident = (residentId) => {
        console.log('residentId-remove', residentId)
        const confirmation = window.confirm('are you sure?')
        if(confirmation){
            dispatch(startRemoveResident(residentId))
        }
    }

    return (
        <div>
            {role === 'pg_admin' && 
                <div>
                    <h1>Residents Details</h1>
                    <h2>Total Residents - {residents.length}</h2>
                    <h4> List of Residents </h4>
                    <ul>
                        {residents.map((resident) => {
                            //console.log('images', resident.profileImage)
                            return (
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
                            )
                        })}
                    </ul>

                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Resident Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {selectedResident && (
                                        <ul>
                                            <li> Name: {selectedResident.name}</li>
                                            <li> Email: {selectedResident.email}</li>
                                            <li> PhoneNumber : {selectedResident.phoneNumber} </li>
                                            <li> Date Of Joining : {selectedResident.dateOfJoining && selectedResident.dateOfJoining.slice(0,10)}</li>
                                            <li> Guardian Name : {selectedResident.guardianName} </li>
                                            <li> Guardian Number : {selectedResident.guardianNumber} </li>
                                            <li> Address : {selectedResident.address} </li>
                                            <ul> Room Details : 
                                                <li> Sharing : {selectedResident.roomId && selectedResident.roomId.sharing} </li>
                                                <li> Room Number : { selectedResident.roomId && selectedResident.roomId.roomNumber}</li>
                                                <li>Floor : {selectedResident.roomId && selectedResident.roomId.floor}</li>
                                            </ul>
                                            {selectedResident.aadharCard && (
                                            <div>
                                                <p>Aadhar Card:</p>
                                                <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width='200' height='200' alt="Aadhar" />
                                            </div>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }     
        </div>
    )
}

export default ResidentsDetails
