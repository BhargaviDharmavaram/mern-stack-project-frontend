
const initialState = {
    pgDetails : []
}

const pgDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ADMIN_PG_DETAILS" : {
            return {...state, pgDetails : [action.payload]}
        }
        case "CREATE_PG":{
            return {...state, pgDetails : [...state.pgDetails, action.payload]}
        }
        default : {
            return {...state}
        }
    }
}

export default pgDetailsReducer