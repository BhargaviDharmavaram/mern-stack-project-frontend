import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating";

const AverageRating = (props) => {
    const [averageRating, setAverageRating] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3800/api/reviews-ratings/averageRating', {
                    headers: {
                        'x-auth': localStorage.getItem('token')
                    }
                })
                console.log('average-rating-res', response.data)
                setAverageRating(response.data)
            } catch (e) {
                alert(e.message)
            }
        }

        fetchData()
    }, [])
    // Calculate the average rating and round it to one decimal place
    const averageRatingRounded = Math.round(averageRating.overallAverageRating * 10) / 10

    return (
        <div>
            <h2>Overall Average Rating</h2>
            <Rating
                emptySymbol={<span className="star">&#9734;</span>}
                fullSymbol={<span className="star">&#9733;</span>}
                initialRating={averageRatingRounded}
                readonly
            />
        </div>
    )
}
export default AverageRating