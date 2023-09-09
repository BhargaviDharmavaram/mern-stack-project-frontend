const initialState = {
    rooms : [], 
    availableRooms : [],
    unAvailableRooms : []
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
            return {...state, rooms : [...state.rooms, action.payload], availableRooms : [...state.availableRooms,action.payload]}
        }
        default : {
            return {...state}
        }
    }
}
export default roomsReducer