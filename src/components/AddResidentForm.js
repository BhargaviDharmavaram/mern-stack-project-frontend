import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateResident, startEditResident} from '../actions/residentsActions'
import AccountConfirmationLink from './AccountConfirmationLink'
import axios from 'axios'

const AddResident = ({editResident}) => {
    const [name, setName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [guardianName, setGuardianName] = useState('')
    const [guardianNumber, setGuardianNumber] = useState('')
    const [address, setAddress] = useState('')
    const [aadharCard, setAadharCard] = useState(null)
    const [roomId, setRoomId] = useState('')
    const [availableRooms, setAvailableRooms] = useState([])

    const profileImageInputRef = useRef(null)
    const aadharCardInputRef = useRef(null)
    
    
    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target
        switch (name) {
        case 'name':
            setName(value)
            break
        case 'phoneNumber':
            setPhoneNumber(value)
            break
        case 'email':
            setEmail(value)
            break
        case 'guardianName':
            setGuardianName(value)
            break
        case 'guardianNumber':
            setGuardianNumber(value)
            break
        case 'address':
            setAddress(value)
            break
        default:
            break
        }
    }

    // Handle file input change for profile image and Aadhar card
    const handleFileInputChange = (e) => {
        const { name, files } = e.target
        switch (name) {
        case 'profileImage':
            setProfileImage(files[0])
            break
        case 'aadharCard':
            setAadharCard(files[0])
            break
        default:
            break
        }
    }

    const pgDetailsId = useSelector((state) => {
        return state.pgDetails.pgDetails.map((ele) => ele._id).join(',')
    })

    useEffect(() => {
        axios
            .get(`http://localhost:3800/api/rooms/availableRooms?pgDetailsId=${pgDetailsId}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
            })
            .then((res) => {
            setAvailableRooms(res.data)
            console.log('rooms', res.data)
            })
            .catch((error) => {
            console.log('Error', error)
            })
    }, [pgDetailsId])

    // Access the Redux state to get the list of residents
    const residents = useSelector((state) => state.residents.residents)
    console.log('residents', residents)
    // Access the last added resident's _id
    const residentId = residents.length > 0 ? residents[residents.length - 1]._id : null
    console.log('residentId', residentId)

    const dispatch = useDispatch()
    
    useEffect(() => {
        // If `editResident` has data, it means you are editing an existing resident.
        // Pre-fill the form fields with the data.
        if (editResident) {
            setName(editResident.name || '')
            setPhoneNumber(editResident.phoneNumber || '')
            setEmail(editResident.email || '')
            setGuardianName(editResident.guardianName || '')
            setGuardianNumber(editResident.guardianNumber || '')
            setAddress(editResident.address || '')
            setRoomId(editResident.roomId || '')

            // Pre-fill profileImage and aadharCard fields with existing s, if available
            if (editResident.profileImage) {
                setProfileImage(editResident.profileImage)
            }

            if (editResident.aadharCard) {
                setAadharCard(editResident.aadharCard)
            }
        }

    }, [editResident])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('guardianName', guardianName)
        formData.append('guardianNumber', guardianNumber)
        formData.append('address', address)
        formData.append('profileImage', profileImage)
        formData.append('aadharCard', aadharCard)
        formData.append('roomId', roomId)
    
        const reset = () => {
            setName('')
            setAddress('')
            setEmail('')
            setGuardianName('')
            setGuardianNumber('')
            setPhoneNumber('')
            setRoomId('')
            profileImageInputRef.current.value = ''
            aadharCardInputRef.current.value= ''
        }   
        if (editResident) {
            await dispatch(startEditResident(editResident._id, formData, pgDetailsId, reset))
        } else {
            await dispatch(startCreateResident(formData, pgDetailsId, reset))
        }
        
        // After successfully adding the resident, make an API call to get the updated available rooms
        const response = await axios.get(`http://localhost:3800/api/rooms/availableRooms?pgDetailsId=${pgDetailsId}`, {
            headers: {
            'x-auth': localStorage.getItem('token'),
            },
        })
        try{
            console.log('updated-rooms-data', response.data)
            setAvailableRooms(response.data)
        }catch(e){
            console.log(e.message)
        }  
                
    }

    return (
        <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Name</label>
            <br />
            <input type="text" name="name" value={name} onChange={handleInputChange} />
            <br />
            <label>Profile Image</label>
            <br />
            <input type="file" ref={profileImageInputRef} name="profileImage" onChange={handleFileInputChange} />
            <br />
            {editResident && editResident.profileImage && (
            <img src={`http://localhost:3800/images/${editResident.profileImage}`} alt="Profile" width='100' height='100' />
            )}
            <br />
            <label>Phone Number</label>
            <br />
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} />
            <br />
            <label>Email</label>
            <br />
            <input type="text" name="email" value={email} onChange={handleInputChange} />
            <br />
            <label>Guardian Name</label>
            <br />
            <input type="text" name="guardianName" value={guardianName} onChange={handleInputChange} />
            <br />
            <label>Guardian Number</label>
            <br />
            <input type="text" name="guardianNumber" value={guardianNumber} onChange={handleInputChange} />
            <br />
            <label>Address</label>
            <br />
            <input type="text" name="address" value={address} onChange={handleInputChange} />
            <br />
            <label>Aadhar Card</label>
            <br />
            <input type="file" ref={aadharCardInputRef} name="aadharCard" onChange={handleFileInputChange} />
            <br />
            {editResident && editResident.aadharCard && (
            <img src={`http://localhost:3800/images/${editResident.aadharCard}`} alt="Profile" width='100' height='100' />
            )}
            <br />
            <label>Select Room:</label>
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                    <option value="">Select a room</option>
                    {availableRooms.map((room) => (
                        <option key={room._id} value={room._id}>
                            {`Room ${room.roomNumber} - Sharing: ${room.sharing}, Floor: ${room.floor}`} 
                        </option>
                    ))}
                </select>
            <br />
            <input type="submit" value={editResident ? 'Update Resident' : 'Add Resident'} />
        </form>
        <AccountConfirmationLink residentId = {residentId} />
        </div>
    )
}

export default AddResident
