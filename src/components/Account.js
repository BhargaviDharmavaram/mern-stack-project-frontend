import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { RoleContext } from "./Main";
import { Link } from "react-router-dom";

const Account = (props) => {
    const [residentPgDetails, setResidentPgDetails] = useState({})
    const [user, setUser] = useState({})
    const { userLoggedIn, role } = useContext(RoleContext)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (userLoggedIn) {
            axios.get('http://localhost:3800/api/users/account', {
                headers: {
                    "x-auth": localStorage.getItem('token')
                }
            })
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }, [userLoggedIn])

    const handlePgDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3800/api/residents/pgDetails/${userId}`)
            setResidentPgDetails(response.data)
            setShowDetails(true) // Show details when the button is clicked
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ marginTop : '5px' }}>
            <div className="card" >
                <div className="card-body">
                    <h1 className="card-title text-center">User Account Details</h1>
                    <p className="card-text">User Name - {user.username}</p>
                    <p className="card-text">Email - {user.email}</p>
                    <p className="card-text">Role - {user.role}</p>
                    {role === 'pg_resident' &&
                        <>
                            <button onClick={() => handlePgDetails(user.id)}>Get PG Details</button>
                            {showDetails && // Show details only if showDetails is true
                                <div>
                                    <p className="card-text">Profile: {residentPgDetails.profileImage && <img src={`http://localhost:3800/images/${residentPgDetails.profileImage}`} width="100px" height="100px" alt="ProfileImage" />}</p>
                                    <p className="card-text">Name: {residentPgDetails.name}</p>
                                    <p className="card-text">PG Name: {residentPgDetails.pgDetailsId && residentPgDetails.pgDetailsId.name}</p>
                                    <p className="card-text">Date Of Joining: {residentPgDetails.dateOfJoining && residentPgDetails.dateOfJoining.slice(0, 10)}</p>
                                    <p className="card-text">Allocated Details:</p>
                                    <p className="card-text">Room Number: {residentPgDetails.roomId && residentPgDetails.roomId.roomNumber}</p>
                                    <p className="card-text">Sharing: {residentPgDetails.roomId && residentPgDetails.roomId.sharing}</p>
                                    <p className="card-text">Floor Number: {residentPgDetails.roomId && residentPgDetails.roomId.floor}</p>
                                </div>
                            }
                        </>
                    }
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Account
