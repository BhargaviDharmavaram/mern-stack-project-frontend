import axios from "axios";


export const startCreateResident = (formData, pgDetailsId, reset) => {
    return async (dispatch) => {
        try{
            const response = await axios.post(`http://localhost:3800/api/residents/addResident/${pgDetailsId}`, formData , {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('resident-res', response.data)
            dispatch(addResident(response.data))
            reset()
        }catch(e){
            alert(e.message)
        }
    }
}

export const addResident = (data) => {
    return{
        type : "ADD_RESIDENT",
        payload : data
    }
}

export const startGetResidents = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/residents/getResidents', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-residents-data',response.data)
            dispatch(getResidents(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getResidents = (data) => {
    return{
        type: "GET_RESIDENTS",  //action creator name
        payload: data   // action creator's payload
    }
}


export const startGetSingleResident = (pgDetailsId,residentId) => {
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3800/api/residents/pg/${pgDetailsId}/resident/${residentId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('single-resident-show', response.data)
            dispatch(getSingleResident(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getSingleResident = (data) => {
    return{
        type : "SINGLE_RESIDENT",
        payload : data
    }
}

export const startRemoveResident = (residentId) => {
    return async (dispatch)=> {
        try{
            const response = await axios.delete(`http://localhost:3800/api/residents/destroyResident/${residentId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('remove-resident-res', response.data)
            dispatch(removeResident(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const removeResident = (data) => {
    return{
        type:"REMOVE_RESIDENT" ,payload:data
    }
}

// export const startEditResident = (residentId) => {
//     return async (dispatch) => {
//         try{
//             const response = await axios.put(`http://localhost:3800/api/residents/updateResident/${residentId}`, {
//                 headers : {
//                     'x-auth' : localStorage.getItem('token')
//                 }
//             })
//             console.log('edit-resident-res', response.data)
//         }catch(e){
//             alert(e.message)
//         }
//     }
// }