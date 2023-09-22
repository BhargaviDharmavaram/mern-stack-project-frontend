import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; 
import { startShowPG } from "../actions/pgDetailsActions";

const PGList = (props) => {
    const allPgs = useSelector((state) => state.pgDetails.allPgs)
    console.log('allPgs', allPgs)

    const dispatch = useDispatch()
    const history = useHistory()
    
    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('')

    const handleShowPG = (pgDetailsId) => {
        console.log('pgId', pgDetailsId)
        dispatch(startShowPG(pgDetailsId))
        history.push(`/showPg/${pgDetailsId}`) // Navigate to ShowPG
    }

    // Filter the PGs based on the search query
    const filteredPgs = allPgs.filter((pg) => {
        // Convert both the name and address to lowercase for case-insensitive search
        const lowerCaseQuery = searchQuery.toLowerCase()
        const lowerCaseName = pg.name.toLowerCase()
        const lowerCaseAddress = pg.address.toLowerCase()

        // Check if either the name or address contains the search query
        return lowerCaseName.includes(lowerCaseQuery) || lowerCaseAddress.includes(lowerCaseQuery)
    })

    return (
        <div>
            <h1>List of PGs</h1>
            <input
                type="text"
                placeholder = "Search by name or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredPgs.map((pg) => {
                return (
                    <div key={pg._id}>
                        <li> {pg.name} </li>
                        <button onClick={() => handleShowPG(pg._id)}>Show</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PGList
