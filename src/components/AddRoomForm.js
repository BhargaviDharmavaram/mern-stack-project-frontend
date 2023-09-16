import React, { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { startCreateRoom, startGetUnAvailableRooms, startGetAllRooms, startGetAvailableRooms } from '../actions/roomActions'
import { RoleContext } from './NavBar'

const AddRoom = (props) => {
    const {role} = useContext(RoleContext)
    const [sharing, setSharing] = useState('')
    const [numRoomsToGenerate, setNumRoomsToGenerate] = useState('')
    const [generateRooms, setGenerateRooms] = useState([])

    const { pgDetailsId } = useParams() // Use the useParams hook to get pgDetailsId
    const history = useHistory() // Use the useHistory hook to access the history object

    const dispatch = useDispatch()

    useEffect(() => {
        // Dispatch actions to get available rooms and all rooms on component mount
        dispatch(startGetAvailableRooms(pgDetailsId))
        dispatch(startGetAllRooms(pgDetailsId))
        dispatch(startGetUnAvailableRooms(pgDetailsId))
    }, [dispatch, pgDetailsId])
    const handleSharingChange = (e) => {
        setSharing(e.target.value)
    }

    const handleNumRoomsChange = (e) => {
        setNumRoomsToGenerate(Number(e.target.value))
    }

    const handleGenerate = () => {
        const newRooms = Array(numRoomsToGenerate).fill({
        roomNumber: '',
        floor: '',
        })
        setGenerateRooms(newRooms)
    }

    const handleRoomChange = (index, field, value) => {
        const updatedRooms = [...generateRooms]
        updatedRooms[index] = {
        ...updatedRooms[index],
        [field]: value,
        }
        setGenerateRooms(updatedRooms)
    }

  
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create arrays for room numbers and floors
        const roomNumbers = generateRooms.map((room) => room.roomNumber)
        const floors = generateRooms.map((room) => room.floor)
        const formData = {
            sharing : sharing,
            roomNumber : roomNumbers,
            floor :floors
        }

        const reset = () => {
            setSharing('')
            setNumRoomsToGenerate('')
            setGenerateRooms([])
        }
    
        try {
            console.log('pgDetailsId-add-room', pgDetailsId)
            await dispatch(startCreateRoom(formData, pgDetailsId, reset))
        } catch (e) {
            console.error(e.message)
        }
        
    }

    const handleAddResidents = () => {
        // Redirect to the "Add Resident" component for the selected PG
        history.push(`/addresident/${pgDetailsId}`)
    }

    return (
        <div>
            {role === 'pg_admin' && 
                <div>
                    <h2>Add Rooms</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Sharing:</label>
                        <input
                            type="text"
                            value={sharing}
                            onChange={handleSharingChange}
                            required
                        />
                        
                        <label>Number of Rooms to Generate:</label>
                        <input
                            type="number"
                            value={numRoomsToGenerate}
                            onChange={handleNumRoomsChange}
                            required
                        />
                        
                        <button type="button" onClick={handleGenerate}>Generate</button>
                        {generateRooms.length > 0 && 
                            <table>
                                <thead>
                                    <tr>
                                    <th>Room</th>
                                    <th>Room Number</th>
                                    <th>Floor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generateRooms.map((room, index) => (
                                    <tr key={index}>
                                        <td>Room {index + 1}</td>
                                        <td>
                                        <input
                                            type="text"
                                            value={room.roomNumber}
                                            onChange={(e) =>
                                            handleRoomChange(index, 'roomNumber', e.target.value)
                                            }
                                            required
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            value={room.floor}
                                            onChange={(e) => handleRoomChange(index, 'floor', e.target.value)}
                                            required
                                        />
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={handleAddResidents}>Add Residents</button>
                </div>
            }   
        </div>
    )
}


export default AddRoom