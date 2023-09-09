const initialState = {
    residents : [],
    selectedResident : {}
}

const residentsReducer = (state = initialState, action) =>{
    switch(action.type){
        case "GET_RESIDENTS" : {
            return {...state, residents : action.payload}
        }
        case "ADD_RESIDENT" : {
            return {...state, residents : [...state.residents, action.payload]}
        }
        case "SINGLE_RESIDENT" : {
            return {...state, selectedResident: action.payload}
        }
        case "REMOVE_RESIDENT" : {
            // Filter out the resident with the specified residentId
            const updatedResidents = state.residents.filter(
                (resident) => resident._id !== action.payload._id
            )

            return { ...state, residents: updatedResidents }
        }
        default : {
            return {...state}
        }
    }
}

export default residentsReducer

