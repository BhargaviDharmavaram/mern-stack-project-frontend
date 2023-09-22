import React, {useState} from "react"
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startGetVacatedResidents } from "../actions/residentsActions"

const VacatedResidents = (props) => {
    const [selectedResident, setSelectedResident] = useState(null)
    const [isFetched, setIsFetched] = useState(false)
    const {pgDetailsId} = useParams()
    const vacatedResidents = useSelector((state) => state.residents.vacatedResidents)
    console.log('vacatedResidents', vacatedResidents)

    const dispatch = useDispatch()

    const handleVacatedResidents = async () => {
        try {
          console.log(pgDetailsId)
          await dispatch(startGetVacatedResidents(pgDetailsId))
          setIsFetched(true)
        } catch (error) {
          console.error("Error fetching vacated residents:", error)
        }
    }

    const handleShowDetails = (resident) => {
        setSelectedResident(resident)
    }

    return(
        <div>
            <h3>Vacated Residents</h3>
            {!isFetched && (
                <button onClick={handleVacatedResidents}>Load Vacated Residents</button>
            )}
            {isFetched && vacatedResidents && vacatedResidents.length > 0 ? (
                <div>
                {vacatedResidents.map((ele) => (
                    <div key={ele._id}>
                    <li>
                        {ele.name} <button onClick={() => handleShowDetails(ele)}>Show</button>
                    </li>
                    </div>
                ))}
                </div>
            ) : isFetched ? (
                <p>{vacatedResidents.message || "No vacated residents found"}</p>
            ) : null}

            {selectedResident && (
                <div>
                    <h4>Vacated Resident Details</h4>
                    <p>Name: {selectedResident.name}</p>
                    <p>Profile Image</p>
                    <img src={`http://localhost:3800/images/${selectedResident.profileImage}`} width='200' height='200' alt="Profile" />
                    <p> Email : {selectedResident.email} </p>
                    <p> PhoneNumber : {selectedResident.phoneNumber} </p>
                    <p> Guardian Name : {selectedResident.guardianName}</p>
                    <p> Guardian Number : {selectedResident.guardianNumber}</p>
                    <p> Address : {selectedResident.address} </p>
                    <p>Aadhar Card:</p>
                    <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width='200' height='200' alt="Aadhar" />
                    <button onClick={() => setSelectedResident(null)}>Close</button>
                </div>
            )}

            <Link to = {`/admindashboard/${pgDetailsId}`}>Cancel</Link>
        </div>
    )
}

export default VacatedResidents