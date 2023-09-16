import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating";
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import { useParams } from "react-router-dom";
import ShowPGReviews from "./ShowPGReviews";

const AverageRating = (props) => {
    const [showReviews, setShowReviews] = useState(false)
    const [averageRating, setAverageRating] = useState({})
    const [errorMessage, setErrorMessage] = useState("") // State variable for error message

    const {pgDetailsId} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3800/api/reviews-ratings/averageRating/${pgDetailsId}`, {
                    headers: {
                        "x-auth": localStorage.getItem("token"),
                    },
                })
                console.log("average-rating-res", response.data)

                // Check if the response contains an error message
                if (response.data.error) {
                    setErrorMessage(response.data.error) // Set the error message state
                } else {
                    setAverageRating(response.data) // Set average rating if no error
                }
            } catch (e) {
                alert(e.message)
            }
        }

        fetchData()
    }, [pgDetailsId])

    // Function to handle cancellation and show "Get Reviews" button again
    const handleCancel = () => {
        setShowReviews(false)
    }

    return (
        <div>
            <h2>Overall Average Rating</h2>
            {errorMessage ? (
                <p>{errorMessage}</p> // Display error message if present
            ) : (
                <>
                    <Rating
                        emptySymbol={<span className="star">&#9734;</span>}
                        fullSymbol={<span className="star">&#9733;</span>}
                        initialRating={Math.round(averageRating.overallAverageRating * 10) / 10}
                        readonly
                    />
                    <li>Facilities: {averageRating.averageFacilitiesRating}</li>
                    <li>Food: {averageRating.averageFoodRating}</li>
                    <li>Hygienic: {averageRating.averageHygienicRating}</li>
                    <li>Safety: {averageRating.averageSafetyRating}</li>
                    <li>Overall Rating: {averageRating.overallAverageRating}</li>
                    {averageRating.overallAverageRating > 0 && ( // Conditionally render the button
                        <button onClick={() => setShowReviews(true)}>Get Reviews</button>
                    )}
                </>
            )}
            {/* {!showReviews && (
                <button onClick={() => setShowReviews(true)}>Get Reviews</button>
            )} */}
            {showReviews && (
                <Offcanvas isOpen={showReviews} toggle={handleCancel}>
                    <OffcanvasHeader>
                        Reviews {""}
                        <Button color="danger" size="sm" onClick={handleCancel}>
                            Close
                        </Button>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <ShowPGReviews handleCancel={handleCancel} />
                    </OffcanvasBody>
                </Offcanvas>
            )}
        </div>
    )
}

export default AverageRating
