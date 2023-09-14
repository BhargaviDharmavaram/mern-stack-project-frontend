import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startAddReview} from "../actions/reviewRatingActions";

const AddReview = (props) => {
    const {handleCancel, pgDetailsId} = props
    console.log(pgDetailsId)
    const [review, setReview] = useState("")
    const [food, setFood] = useState('')
    const [facilities, setFacilities] = useState('')
    const [hygienic, setHygienic] = useState('')
    const [safety, setSafety] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Create an object with the form data
            const formData = {
                review,
                rating: {
                    food,
                    facilities,
                    hygienic,
                    safety,
                },
                pgDetailsId
            }
            console.log('formdata-review', formData)
            // Clear the form after submission
            const reset = () => {
                setReview("")
                setFood('')
                setFacilities('')
                setHygienic('')
                setSafety('')
            }
            dispatch(startAddReview(formData, reset))

        } catch (error) {
            console.error("Error adding review:", error)
        }
    }

    return (
        <div>
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Review</label>
                <input 
                    type="text"
                    placeholder="Write a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                </div>
                <div>
                <label>Food</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={food}
                    onChange={(e) => setFood(parseInt(e.target.value))}
                />
                </div>
                <div>
                <label>Facilities</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={facilities}
                    onChange={(e) => setFacilities(parseInt(e.target.value))}
                />
                </div>
                <div>
                <label>Hygienic</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={hygienic}
                    onChange={(e) => setHygienic(parseInt(e.target.value))}
                />
                </div>
                <div>
                <label>Safety</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={safety}
                    onChange={(e) => setSafety(parseInt(e.target.value))}
                />
                </div>
                <button type="submit">Submit Review</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default AddReview
