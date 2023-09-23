// import React, { useContext, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { startGetSingleResident, startRemoveResident } from "../actions/residentsActions";
// import { RoleContext } from "./NavBar";
// import { useParams, useHistory } from "react-router-dom";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button
// } from "reactstrap";
// // Import icons from react-icons
// import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

// const ResidentsDetails = (props) => {
//     const { role } = useContext(RoleContext)
//     const { pgDetailsId } = useParams()
//     const dispatch = useDispatch()
//     const history = useHistory()

//     const [showModal, setShowModal] = useState(false)
//     useEffect(() => {
//         dispatch({ type: "CLEAR_SELECTED_RESIDENT" })
//     }, [dispatch])

//     const residents = useSelector((state) => state.residents.residents)
//     const selectedResident = useSelector((state) => state.residents.selectedResident)

//     // State for pagination
//     const [currentPage, setCurrentPage] = useState(1)
//     const residentsPerPage = 5

//     // Calculate the index of the first and last resident on the current page
//     const indexOfLastResident = currentPage * residentsPerPage
//     const indexOfFirstResident = indexOfLastResident - residentsPerPage
//     const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident)

//     const handleShowResident = (residentId) => {
//         dispatch(startGetSingleResident(pgDetailsId, residentId))
//         setShowModal(true)
//     }

//     const closeModal = () => {
//         setShowModal(false)
//     }

//     const handleRemoveResident = (residentId) => {
//         const confirmation = window.confirm("Are you sure?")
//         if (confirmation) {
//         dispatch(startRemoveResident(pgDetailsId, residentId))
//         }
//     }

//     const handleEditResident = (residentId) => {
//         // Navigate to the EditResident component with the resident's id as a parameter
//         history.push(`/editresident/${pgDetailsId}/${residentId}`)
//     }

//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber)
//     }

//     return (
//         <div>
//             {role === "pg_admin" && (
//                 <div>
//                     <h3 className="mb-3 text-center" style={{color : '#EE6C13'}}>Residents Details</h3>
//                     <h4 className="mb-3 text-center" style={{color: '#298384'}}>Total Residents - <b> {residents.length} </b> </h4>
//                     <div className="card mb-3">
//                     <div className="card-body">
//                         {currentResidents.map((resident) => (
//                         <div key={resident._id}>
//                             <div className="row">
//                             <div className="col-md-3">
//                                 <img
//                                 src={`http://localhost:3800/images/${resident.profileImage}`}
//                                 alt="Profile"
//                                 className="card-img"
//                                 width="100px" 
//                                 height="100px"
//                                 />
//                             </div>
//                             <div className="col-md-9">
//                                 <h5 className="card-title"> Name: {resident.name}</h5>
//                                 <p className="card-text" style={{ display: "flex", alignItems: "center" }}>
//                                 <div className="icon-button" style={{ marginRight: "10px" }}>
//                                     <FaEye onClick={() => handleShowResident(resident._id)} style={{ color: "blue" }} />
//                                 </div>
//                                 <div className="icon-button" style={{ marginRight: "10px" }}>
//                                     <FaEdit onClick={() => handleEditResident(resident._id)} style={{ color: "green" }} />
//                                 </div>
//                                 <div className="icon-button">
//                                     <FaTrash onClick={() => handleRemoveResident(resident._id)} style={{ color: "red" }} />
//                                 </div>
//                                 </p>
//                             </div>
//                             </div>
//                         </div>
//                         ))}
//                     </div>
//                     </div>

//                     {/* Pagination */}
//                     <ul className="pagination justify-content-center">
//                         {Array.from({ length: Math.ceil(residents.length / residentsPerPage) }).map((_, index) => (
//                             <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
//                                 <span onClick={() => paginate(index + 1)} className="page-link">
//                                     {index + 1}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <Modal isOpen={showModal} toggle={closeModal}>
//                 <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
//                 <ModalBody>
//                 {selectedResident && (
//                     <ul>
//                     <li>Name: {selectedResident.name}</li>
//                     <li>Profile Image :{selectedResident.profileImage && (
//                         <div>
//                         <img src={`http://localhost:3800/images/${selectedResident.profileImage}`} width="200" height="200" alt="Aadhar" />
//                         </div>
//                     )} </li>
//                     <li>Email: {selectedResident.email}</li>
//                     <li>PhoneNumber: {selectedResident.phoneNumber}</li>
//                     <li>Date Of Joining: {selectedResident.dateOfJoining && selectedResident.dateOfJoining.slice(0, 10)}</li>
//                     <li>Guardian Name: {selectedResident.guardianName}</li>
//                     <li>Guardian Number: {selectedResident.guardianNumber}</li>
//                     <li>Address: {selectedResident.address}</li>
//                     <ul>
//                         Room Details:
//                         <li>Sharing: {selectedResident.roomId && selectedResident.roomId.sharing}</li>
//                         <li>Room Number: {selectedResident.roomId && selectedResident.roomId.roomNumber}</li>
//                         <li>Floor: {selectedResident.roomId && selectedResident.roomId.floor}</li>
//                     </ul>
//                     {selectedResident.aadharCard && (
//                         <div>
//                         <p>Aadhar Card:</p>
//                         <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width="200" height="200" alt="Aadhar" />
//                         </div>
//                     )}
//                     </ul>
//                 )}
//                 </ModalBody>
//                 <ModalFooter>
//                 <Button color="secondary" onClick={closeModal}>
//                     Close
//                 </Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     )
// }

// export default ResidentsDetails

// import React, { useContext, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { startGetSingleResident, startRemoveResident } from "../actions/residentsActions";
// import { RoleContext } from "./NavBar";
// import { useParams, useHistory } from "react-router-dom";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Pagination,
//   PaginationItem,
//   PaginationLink
// } from "reactstrap";
// // Import icons from react-icons
// import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

// const ResidentsDetails = (props) => {
//     const { role } = useContext(RoleContext)
//     const { pgDetailsId } = useParams()
//     const dispatch = useDispatch()
//     const history = useHistory()

//     const [showModal, setShowModal] = useState(false)
//     useEffect(() => {
//         dispatch({ type: "CLEAR_SELECTED_RESIDENT" })
//     }, [dispatch])

//     const residents = useSelector((state) => state.residents.residents)
//     const selectedResident = useSelector((state) => state.residents.selectedResident)

//     // State for pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const residentsPerPage = 5;

//     // Calculate the index of the first and last resident on the current page
//     const indexOfLastResident = currentPage * residentsPerPage;
//     const indexOfFirstResident = indexOfLastResident - residentsPerPage;
//     const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

//     const handleShowResident = (residentId) => {
//         dispatch(startGetSingleResident(pgDetailsId, residentId))
//         setShowModal(true)
//     }

//     const closeModal = () => {
//         setShowModal(false)
//     }

//     const handleRemoveResident = (residentId) => {
//         const confirmation = window.confirm("Are you sure?")
//         if (confirmation) {
//         dispatch(startRemoveResident(pgDetailsId, residentId))
//         }
//     }

//     const handleEditResident = (residentId) => {
//         // Navigate to the EditResident component with the resident's id as a parameter
//         history.push(`/editresident/${pgDetailsId}/${residentId}`)
//     }

//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }

//     return (
//         <div>
//             {role === "pg_admin" && (
//                 <div>
//                     <h3 className="mb-3 text-center" style={{color : '#EE6C13'}}>Residents Details</h3>
//                     <h4 className="mb-3 text-center" style={{color: '#298384'}}>Total Residents - <b> {residents.length} </b> </h4>
//                     <div className="card mb-3">
//                     <div className="card-body">
//                         {currentResidents.map((resident) => (
//                         <div key={resident._id}>
//                             <div className="row">
//                             <div className="col-md-3">
//                                 <img
//                                 src={`http://localhost:3800/images/${resident.profileImage}`}
//                                 alt="Profile"
//                                 className="card-img"
//                                 width="100px" 
//                                 height="100px"
//                                 />
//                             </div>
//                             <div className="col-md-9">
//                                 <h5 className="card-title"> Name: {resident.name}</h5>
//                                 <p className="card-text" style={{ display: "flex", alignItems: "center" }}>
//                                 <div className="icon-button" style={{ marginRight: "10px" }}>
//                                     <FaEye onClick={() => handleShowResident(resident._id)} style={{ color: "blue" }} />
//                                 </div>
//                                 <div className="icon-button" style={{ marginRight: "10px" }}>
//                                     <FaEdit onClick={() => handleEditResident(resident._id)} style={{ color: "green" }} />
//                                 </div>
//                                 <div className="icon-button">
//                                     <FaTrash onClick={() => handleRemoveResident(resident._id)} style={{ color: "red" }} />
//                                 </div>
//                                 </p>
//                             </div>
//                             </div>
//                         </div>
//                         ))}
//                     </div>
//                     </div>

//                     {/* Reactstrap Pagination */}
//                     <Pagination className="justify-content-center">
//                         <PaginationItem disabled={currentPage === 1}>
//                             <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
//                         </PaginationItem>
//                         {Array.from({ length: Math.ceil(residents.length / residentsPerPage) }).map((_, index) => (
//                             <PaginationItem key={index} active={index + 1 === currentPage}>
//                                 <PaginationLink onClick={() => paginate(index + 1)}>
//                                     {index + 1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))}
//                         <PaginationItem disabled={currentPage === Math.ceil(residents.length / residentsPerPage)}>
//                             <PaginationLink next onClick={() => paginate(currentPage + 1)} />
//                         </PaginationItem>
//                     </Pagination>
//                 </div>
//             )}

//             <Modal isOpen={showModal} toggle={closeModal}>
//                 <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
//                 <ModalBody>
//                 {selectedResident && (
//                     <ul>
//                     <li>Name: {selectedResident.name}</li>
//                     <li>Profile Image :{selectedResident.profileImage && (
//                         <div>
//                         <img src={`http://localhost:3800/images/${selectedResident.profileImage}`} width="200" height="200" alt="Aadhar" />
//                         </div>
//                     )} </li>
//                     <li>Email: {selectedResident.email}</li>
//                     <li>PhoneNumber: {selectedResident.phoneNumber}</li>
//                     <li>Date Of Joining: {selectedResident.dateOfJoining && selectedResident.dateOfJoining.slice(0, 10)}</li>
//                     <li>Guardian Name: {selectedResident.guardianName}</li>
//                     <li>Guardian Number: {selectedResident.guardianNumber}</li>
//                     <li>Address: {selectedResident.address}</li>
//                     <ul>
//                         Room Details:
//                         <li>Sharing: {selectedResident.roomId && selectedResident.roomId.sharing}</li>
//                         <li>Room Number: {selectedResident.roomId && selectedResident.roomId.roomNumber}</li>
//                         <li>Floor: {selectedResident.roomId && selectedResident.roomId.floor}</li>
//                     </ul>
//                     {selectedResident.aadharCard && (
//                         <div>
//                         <p>Aadhar Card:</p>
//                         <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width="200" height="200" alt="Aadhar" />
//                         </div>
//                     )}
//                     </ul>
//                 )}
//                 </ModalBody>
//                 <ModalFooter>
//                 <Button color="secondary" onClick={closeModal}>
//                     Close
//                 </Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     )
// }

// export default ResidentsDetails


import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetSingleResident, startRemoveResident } from "../actions/residentsActions";
import { RoleContext } from "./NavBar";
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

    return (
        <div>
            {role === "pg_admin" && (
                <div>
                    <h3 className="mb-3 text-center" style={{color : '#EE6C13'}}>Residents Details</h3>
                    <h4 className="mb-3 text-center" style={{color: '#298384'}}>Total Residents - {residents.length} </h4>
                    <div className="card mb-3">
                    <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                        {residents.map((resident) => (
                        <div key={resident._id} className="card mb-2">
                            <div className="row">
                            <div className="col-md-3">
                                <img
                                src={`http://localhost:3800/images/${resident.profileImage}`}
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
                    </div>
                </div>
            )}

            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
                <ModalBody>
                {selectedResident && (
                    <ul>
                    <li>Name: {selectedResident.name}</li>
                    <li>Profile Image :{selectedResident.profileImage && (
                        <div>
                        <img src={`http://localhost:3800/images/${selectedResident.profileImage}`} width="200" height="200" alt="Aadhar" />
                        </div>
                    )} </li>
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
                        <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width="200" height="200" alt="Aadhar" />
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
        </div>
    )
}

export default ResidentsDetails


