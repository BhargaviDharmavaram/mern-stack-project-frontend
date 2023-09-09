import axios from "axios"
import Swal from "sweetalert2"

export const startCreateRoom = (formData, pgDetailsId, reset) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
            `http://localhost:3800/api/rooms/addRoom/${pgDetailsId}`,
            formData,
            {
                headers: {
                'x-auth': localStorage.getItem('token'),
                },
            })
            console.log('room-added',response.data)
            // Check if there are rooms in the response
            if (response.data.rooms && response.data.rooms.length > 0) {
                // reduce to accumulate room details into a single string
                const roomDetails = response.data.rooms.reduce((details, room, index) => {
                    details += `Room ${index + 1} Details:\n`
                    details += `Sharing: ${room.sharing}\n`
                    details += `Room Number: ${room.roomNumber}\n`
                    details += `Floor: ${room.floor}\n\n`
                    return details
                }, '')

                // Create a message that includes the success message from the response, room count, and room details
                const message = `${response.data.message}\n\n`

                // Show a Swal popup with the room details
                Swal.fire({
                    title: message,
                    icon: 'success',
                    html : `${response.data.rooms.length} Room(s) Added\n\n <br><br>${roomDetails}`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
                // Dispatch the createRoom action with the response data
                dispatch(createRoom(response.data))

                // Call the reset function to clear form data
                reset()
            }
        } catch (e) {
            // Show an error message if an error occurs while adding a room
            Swal.fire({
            title: 'Error',
            text: 'An error occurred while adding a room.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            })
        }
    }
}

export const createRoom = (data) => {
    return{
        type : "ADD_ROOM",
        payload : data
    }
}

export const startGetAllRooms = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/rooms/allRooms', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-rooms', response.data)
            dispatch(getAllRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAllRooms = (data) => {
    return{
        type : "GET_ALL_ROOMS",
        payload : data
    }
}

export const startGetAvailableRooms = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/rooms/availableRooms', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-available-rooms', response.data)
            dispatch(getAvailableRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAvailableRooms = (data) => {
    return{
        type : "GET_AVAILABLE_ROOMS",
        payload : data
    }
}

export const startGetUnAvailableRooms = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/rooms/unAvailableRooms', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-unavailable-rooms', response.data)
            dispatch(getunAvailableRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getunAvailableRooms = (data) => {
    return{
        type : "GET_UNAVAILABLE_ROOMS",
        payload : data
    }
}