import React, { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams, useHistory } from 'react-router-dom';

const AccountConfirmationLink = (props) => {
    const [email, setEmail] = useState('')

    const { pgDetailsId } = useParams() // Get the pgDetailsId from the URL parameters
    console.log('pgDetailsId-confirmation', pgDetailsId)

    const history = useHistory()
    
    const {residentId} = props
    //console.log(residentId)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const accountConfirmation = await axios.post(`http://localhost:3800/api/residents/sendConfirmationLink/${residentId}?pgDetailsId=${pgDetailsId}` , {email : email }, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            //console.log(accountConfirmation.data)
            const  message  = accountConfirmation.data.message
            let icon = 'success'
            let title = 'Confirmation' 

            if (message.includes('Provide a valid email')) {
                icon = 'warning'
                title = 'Warning'
            }

            // Show SweetAlert2 popup with the appropriate icon
            Swal.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setEmail('')
        }catch(e){
            // Show SweetAlert2 popup for error
            Swal.fire({
                title: 'Error',
                text: 'An error occurred.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
        }
    } 

    const handleGoToDashBoard = () => {
        history.push(`/admindashboard/${pgDetailsId}`)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Send Confirmation Account Link</h1>
                <label>Enter Email</label>
                <input type = "text"  value = {email} name = 'email' onChange={(e) =>setEmail(e.target.value)}/>
                <input type = "submit" value = 'Send Confirmation Link' />
            </form>

            <button onClick={handleGoToDashBoard}>Go to DashBoard</button>
        </div>
    )
}

export default AccountConfirmationLink