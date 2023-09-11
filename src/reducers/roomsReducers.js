const initialState = {
    rooms : [], 
    availableRooms : [],
    unAvailableRooms : [], 
    selectedRoom : {},
    removeRoomError: null
}

const roomsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ALL_ROOMS" : {
            return {...state , rooms : action.payload}
        }
        case "GET_AVAILABLE_ROOMS" : {
            return {...state , availableRooms : action.payload}
        }
        case "GET_UNAVAILABLE_ROOMS" : {
            return {...state , unAvailableRooms : action.payload}
        }
        case "ADD_ROOM" : {
            return {...state, 
                rooms : [...state.rooms, action.payload], 
                availableRooms : [...state.availableRooms,action.payload],
                removeRoomError: null
            }
        }
        case "SHOW_SINGLE_ROOM" :{
            return {...state, selectedRoom : action.payload}
        }
        case "REMOVE_ROOM" : {
            const updatedRooms = state.rooms.filter(
                (room) => room._id !== action.payload._id
            )
            return { ...state, rooms : updatedRooms, availableRooms : updatedRooms }
            // const updatedRooms = state.rooms.filter((room) => room._id !== action.payload._id);
            // const updatedAvailableRooms = state.availableRooms.filter((room) => room._id !== action.payload._id)
          
            // return {
            //   ...state,
            //   rooms: updatedRooms,
            //   availableRooms: updatedAvailableRooms,
            //   removeRoomError: null,
            // }
        }
        case "REMOVE_ROOM_ERROR": {
            return { ...state, removeRoomError: action.payload }
        }
        default : {
            return {...state}
        }
    }
}
export default roomsReducer