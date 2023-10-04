import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetSingleResident, startRemoveResident } from "../actions/residentsActions";
import { RoleContext } from "./Main";
import { useParams, useHistory } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
// Import icons from react-icons
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

const ResidentsDetails = (props) => {
    const { role } = useContext(RoleContext)
    const { pgDetailsId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchQuery, setSearchQuery] = useState("") // State for search query

    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        dispatch({ type: "CLEAR_SELECTED_RESIDENT" })
    }, [dispatch])

    const residents = useSelector((state) => state.residents.residents)
    const selectedResident = useSelector((state) => state.residents.selectedResident)

    const handleShowResident = (residentId) => {
        dispatch(startGetSingleResident(pgDetailsId, residentId))
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleRemoveResident = (residentId) => {
        const confirmation = window.confirm("Are you sure?")
        if (confirmation) {
        dispatch(startRemoveResident(pgDetailsId, residentId))
        }
    }

    const handleEditResident = (residentId) => {
        // Navigate to the EditResident component with the resident's id as a parameter
        history.push(`/editresident/${pgDetailsId}/${residentId}`)
    }

    // Filter residents based on the search query
    const filteredResidents = residents.filter((resident) =>
        resident.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            {role === "pg_admin" && (
                <div>
                    <h3 className="mb-3 text-center" style={{color : '#EE6C13'}}>Residents Details</h3>
                    <h4 className="mb-3 text-center" style={{color: '#298384'}}>Total Residents - {residents.length} </h4>
                    <div>
                    {residents.length > 0 && 
                        <div>
                            <input
                            type="text"
                            placeholder="Search by Resident Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                        />
                        </div>
                    } <br />
                    <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                        {filteredResidents.length === 0 ? <p> No Residents found. Add your first resident </p> : 
                            <div> 
                                {filteredResidents.map((resident) => (
                                <div key={resident._id} className="card mb-2">
                                    <div className="row">
                                    <div className="col-md-3">
                                        <img
                                        src={resident.profileImage}
                                        alt="Profile"
                                        className="card-img"
                                        width="100px" 
                                        height="100px"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <h5 className="card-title"> <i style={{ color: "#D13570" }}>  {resident.name} </i></h5>
                                        <p className="card-text" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="icon-button" style={{ marginRight: "10px" }}>
                                            <FaEye onClick={() => handleShowResident(resident._id)} style={{ color: "blue" }} />
                                        </div>
                                        <div className="icon-button" style={{ marginRight: "10px" }}>
                                            <FaEdit onClick={() => handleEditResident(resident._id)} style={{ color: "green" }} />
                                        </div>
                                        <div className="icon-button">
                                            <FaTrash onClick={() => handleRemoveResident(resident._id)} style={{ color: "red" }} />
                                        </div>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        }
                        
                    </div>
                    </div>
                </div>
            )}

            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
                <ModalBody>
                    {selectedResident && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{selectedResident.name}</td>
                                </tr>
                                <tr>
                                    <td>Profile Image:</td>
                                    <td>
                                        {selectedResident.profileImage && (
                                            <img
                                                src={selectedResident.profileImage}
                                                width="200"
                                                height="200"
                                                alt="Aadhar"
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{selectedResident.email}</td>
                                </tr>
                                <tr>
                                    <td>PhoneNumber:</td>
                                    <td>{selectedResident.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Date Of Joining:</td>
                                    <td>
                                        {selectedResident.dateOfJoining && selectedResident.dateOfJoining.slice(0, 10)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Guardian Name:</td>
                                    <td>{selectedResident.guardianName}</td>
                                </tr>
                                <tr>
                                    <td>Guardian Number:</td>
                                    <td>{selectedResident.guardianNumber}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{selectedResident.address}</td>
                                </tr>
                                <tr>
                                    <td>Room Details:</td>
                                    <td>
                                        <ul>
                                            <li>
                                                Sharing: {selectedResident.roomId && selectedResident.roomId.sharing}
                                            </li>
                                            <li>
                                                Room Number: {selectedResident.roomId && selectedResident.roomId.roomNumber}
                                            </li>
                                            <li>
                                                Floor: {selectedResident.roomId && selectedResident.roomId.floor}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                {selectedResident.aadharCard && (
                                    <tr>
                                        <td>Aadhar Card:</td>
                                        <td>
                                            <img
                                                src={selectedResident.aadharCard}
                                                width="200"
                                                height="200"
                                                alt="Aadhar"
                                            />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                      <h4>Payment Details</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedResident.payments &&
                                        selectedResident.payments.map((payment) => (
                                            <tr key={payment._id}>
                                                <td>{payment.paymentDate.slice(0,10)}</td>
                                                <td>{payment.amount}</td>
                                                <td>{payment.status}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default ResidentsDetails


