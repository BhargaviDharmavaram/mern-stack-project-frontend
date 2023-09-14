import React from "react";
import { useSelector } from "react-redux";

const ShowPGReviews = (props) =>{
    const {handleCancel} = props
    const reviewsAndRatingsOfPg = useSelector((state)=>{
        return state.reviewsAndRatings.reviewsAndRatings
    })
    console.log('reviewsAndRatingsOfPg',reviewsAndRatingsOfPg)

    return(
        <div>
            {reviewsAndRatingsOfPg.map((ele)=>{
                return(
                    <div key={ele._id}>
                        <li>{ele.review} - {ele.residentId && ele.residentId.name} - {ele.createdAt.slice(0,10)}</li>
                    </div>
                )
            })}
            <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default ShowPGReviews