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
        case 'EDIT_RESIDENT': {
            // Find the index of the edited resident in the state
            const editedIndex = state.residents.findIndex(
                (resident) => resident._id === action.payload._id
            )

            if (editedIndex !== -1) {
                // Update the state by replacing the existing resident with the edited one
                const updatedResidents = [...state.residents]
                updatedResidents[editedIndex] = action.payload

                return {
                    ...state,
                    residents: updatedResidents,
                }
            }

            return state
        }
        default: {
            return state
        }
    }
}

export default residentsReducer

