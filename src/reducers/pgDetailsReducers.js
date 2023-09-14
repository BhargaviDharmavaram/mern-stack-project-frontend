
const initialState = {
    pgDetails : [], 
    allPgs : [], 
    selectedPG : {}
}

const pgDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ADMIN_PG_DETAILS" : {
            return {...state, pgDetails : action.payload}
        }
        case "CREATE_PG":{
            return {...state, pgDetails : [...state.pgDetails, action.payload]}
        }
        case "ALL_PGS" : {
            return {...state, allPgs : action.payload}
        }
        case "SHOW_PG" : {
            return {...state, selectedPG : action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default pgDetailsReducer