import React from 'react'
import { useLocation } from 'react-router-dom'

const PaymentPage = (props) => {
    const location = useLocation()
    const razorPayId = location.pathname.split('/').pop() // Extract razorPayId from URL
    console.log(razorPayId)

    const handlePayment = async () => {
        if (window.Razorpay) {
            const res = await fetch(`http://localhost:3800/api/payments/getPaymentDetails/${razorPayId}`)
            const paymentData = await res.json()
            console.log(paymentData)
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: paymentData.amount,
                currency: 'INR',
                name: paymentData.pgName,
                description: 'Monthly Payment',
                order_id: paymentData.razorPayId,
                handler: async (response) => {
                    // Handle the payment response here
                    console.log(response)
                    // After successful payment, call the backend API to confirm the payment
                    try {
                        const confirmationResponse = await fetch('http://localhost:3800/api/payments/payment/confirmation', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: paymentData.razorPayId,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        })

                        const confirmationData = await confirmationResponse.json();
                        console.log(confirmationData)
                    } catch (error) {
                        console.error('Error confirming payment:', error)
                    }
                },
                prefill: {
                    email: paymentData.email,
                    contact: paymentData.phoneNumber
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } else {
            console.error('Razorpay is not loaded')
        }
    }
    
    return(
        <div>
            Your Payment Order is :  {razorPayId}
                <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
    )
}

export default PaymentPage