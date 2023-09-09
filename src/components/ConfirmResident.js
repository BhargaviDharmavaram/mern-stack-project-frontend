import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function ConfirmResident(props) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userParam = searchParams.get('user')
    const residentParam = searchParams.get('resident')
    
    const [confirmationStatus, setConfirmationStatus] = useState('')

    const handleConfirmAccount = async () => {
      try {
        // Make an API call to update isAccountLinked and assign the userId to the userId field in residentsmodel
        await axios.put(`http://localhost:3800/api/residents/confirmResident/${residentParam}?user=${userParam}`)
        setConfirmationStatus('Account confirmed successfully.')
      } catch (error) {
        setConfirmationStatus('An error occurred while confirming the account.')
      }
    }

    const handleBackToHome = () => {
      window.location.href = '/' // Redirect to your success or home page
    }

    return (
      <div>
        <h2>Resident Account Confirmation</h2>
        <p>{confirmationStatus}</p>
        <button onClick={handleConfirmAccount}>Confirm Account</button>
        <button onClick={handleBackToHome}>Back to Home</button>
      </div>
    )
}

export default ConfirmResident

// useLocation is a hook provided by react-router-dom that gives you access to the current location. In this case, it's used to access the query parameters from the URL.

// URLSearchParams is a built-in JavaScript object that helps parse and manage query parameters in URLs. It's used to extract the values of the user and resident query parameters from the URL.

// The userParam and residentParam variables store the values of the user and resident parameters, respectively. These values are extracted from the query parameters in the URL.
//The useLocation hook and URLSearchParams object are used together to extract the query parameters from the URL
