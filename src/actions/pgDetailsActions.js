import axios from "axios"

export const startCreatePG = (formData, reset) => {
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3800/api/pgdetails/createPg', formData, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('pg-response', response.data)
            dispatch(createPG(response.data))
            reset()
        }catch(e){
            alert(e.message)
        }
    }
}

export const createPG = (data) => {
    return {
        type : "CREATE_PG",
        payload : data
    }
}

export const startAdminGetPgDetails = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3800/api/pgdetails/getAdminPg', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('response-pgs', response.data)
            // Check if the response is null and handle it appropriately
            if (response.data === null) {
                dispatch(getAdminPG([])) // Dispatch an empty array
            } else {
                dispatch(getAdminPG(response.data))
            }
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAdminPG = (data) => {
    return {
        type : "GET_ADMIN_PG_DETAILS",
        payload : data
    }
}
