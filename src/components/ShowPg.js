import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startShowPG } from "../actions/pgDetailsActions";
import {Link} from 'react-router-dom'
import { startGetAvailableRoomsForResident } from "../actions/roomActions";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AddReview from "./AddReview";
import { startGetAllReviewsForSelectedPg , startEditReview, startDeleteReview, clearReviews} from "../actions/reviewRatingActions";

const ShowPG = () => {

    // State variable to control the visibility of the AddReview component
    const [showAddReview, setShowAddReview] = useState(false)

    const { pgDetailsId } = useParams() // Get the pgDetailsId from URL params
    const selectedPG = useSelector((state) => state.pgDetails.selectedPG)

    const allReviewsForPG = useSelector((state)=> state.reviewsAndRatings.allReviewsForPG)
    console.log('allReviewsForPg', allReviewsForPG)
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetch the selected PG details when the component mounts
        console.log('useeffect-pgId', pgDetailsId)
        dispatch(startShowPG(pgDetailsId))
        dispatch(startGetAvailableRoomsForResident(pgDetailsId))
        dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
    }, [dispatch, pgDetailsId])

    useEffect(()=>{
        return function(){
            console.log('component removed')
            dispatch(clearReviews())
        }
    },[dispatch])

    
    const availableRoomsForResident = useSelector((state)=>{
        return state.rooms.availableRoomsForResident
    })
    console.log('availableRoomsforresident', availableRoomsForResident)

    // Function to handle cancellation and show "Add Review" button again
    const handleCancel = () => {
        setShowAddReview(false)
    }

    const handleReviewEdit = (reviewId) => {
        console.log("handle review edit", reviewId)
        const input = prompt('enter review')
        if(input){
            dispatch(startEditReview(reviewId, input))
            dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
        }
    }

    const handleReviewRemove = (reviewId) => {
        console.log("remove review", reviewId)
        const confirmation = window.confirm('Are you sure?')
        if(confirmation){
            dispatch(startDeleteReview(reviewId))
            dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
        }
    }
    return (
        <div>
            {/* Replace the "Go to dashboard" link with a back arrow */}
            <Link to="/residentdashboard">Back to Dashboard</Link>
            <h1>PG Details</h1>
            {selectedPG ? (
                <div>
                    <p> Name: {selectedPG.name}</p>
                    <p> Type of PG : {selectedPG.pgType} </p>
                    <p> Address: {selectedPG.address}</p>
                    <p>Contact : {selectedPG.contact} </p>
                    <p>Pricing Details : {selectedPG.pricing && selectedPG.pricing.map((ele)=>{
                        return(
                            <div key={ele._id}> Sharing : {ele.share} - Amount : {ele.amount}  </div>
                        )
                    })}</p>
                    <p> Facilities : {selectedPG.facilities && selectedPG.facilities.map((ele)=>{
                        return( 
                            <div>
                                <li> {ele} </li>
                            </div>
                        )
                    })} </p>
                    <p> Type of Food : {selectedPG.foodType} </p>
                    <p>Near By Places : {selectedPG.nearByPlaces && selectedPG.nearByPlaces.map((place)=>{
                        return (
                            <div key={place._id}>
                                Name : {place.name} - Distance - {place.distance}
                            </div>
                        )
                    })}</p>
                    <p> <b> Available Rooms </b> </p>
                    {availableRoomsForResident.map((room)=>{
                        return(
                            <div key={room._id}>
                                <li> Sharing : {room.sharing} - Room Number : {room.roomNumber} - Floor : {room.floor} </li>
                            </div>
                        )
                    })}
                    <p>Reviews</p>
                    {allReviewsForPG.length === 0 ? (
                        <p>No reviews available for this PG.</p>
                        ) : (
                        <div>
                            {allReviewsForPG.map((review) => (
                            <div key={review._id}>
                                <li>
                                {review.review} -- {review.residentId && review.residentId.name}
                                <button
                                    onClick={() => {
                                    handleReviewEdit(review._id)
                                    }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleReviewRemove(review._id)}>
                                    Remove
                                </button> <br />
                                Food : {review.rating && review.rating.food} <br />
                                Safety : {review.rating && review.rating.safety} <br />
                                Hygienic : {review.rating && review.rating.hygienic} <br />
                                Facilities : {review.rating && review.rating.facilities} <br />
                                </li>
                            </div>
                        ))}
                    </div>
                    )}
                    <p> Images </p>
                    <Carousel>
                        {selectedPG.images && selectedPG.images.map((image, index) => (
                        <div key={index} style={{ maxWidth: '300px', maxHeight: '300px' }}>
                            <img
                            src={`http://localhost:3800/images/${image}`}
                            alt={`PGImage ${index}`}
                            style={{ maxWidth: '100%', maxHeight: '100%'}}
                            />
                        </div>
                        ))}
                    </Carousel> <hr />
                    {!showAddReview && (
                        <button onClick={() => setShowAddReview(true)}>Add Review</button>
                    )}
                    {showAddReview && <AddReview handleCancel = {handleCancel} pgDetailsId = {pgDetailsId} />}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default ShowPG
