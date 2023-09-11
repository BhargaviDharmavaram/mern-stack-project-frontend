import React, {useState} from "react"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { startGetVacatedResidents } from "../actions/residentsActions"

const VacatedResidents = (props) => {
    const [selectedResident, setSelectedResident] = useState(null)

    const vacatedResidents = useSelector((state) => state.residents.vacatedResidents)
    console.log('vacatedResidents', vacatedResidents)

    const dispatch = useDispatch()

    const handleVacatedResidents =  () => {
        dispatch(startGetVacatedResidents())
    }
    
    const handleShowDetails = (resident) => {
        setSelectedResident(resident)
    }

    return(
        <div>
            <h3>Vacated Residents</h3>
            <button onClick={handleVacatedResidents}>Vacated Residents</button>
            {vacatedResidents && (
                <div>
                    {vacatedResidents.map((ele)=>{
                        return(
                            <div key={ele._id}>
                                <li>{ele.name} <button onClick={() => handleShowDetails(ele)}>Show</button></li>
                            </div>
                        )
                    })}
                </div>
            )}

            {selectedResident && (
                <div>
                    <h4>Vacated Resident Details</h4>
                    <p>Name: {selectedResident.name}</p>
                    <p>Profile Image</p>
                    <img src={`http://localhost:3800/images/${selectedResident.aadharCard}`} width='200' height='200' alt="Profile" />
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

            <Link to="/admindashboard">Cancel</Link>
        </div>
    )
}

export default VacatedResidents