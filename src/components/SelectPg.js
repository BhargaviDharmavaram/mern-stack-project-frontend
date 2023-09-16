import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SelectPg(props) {
    const pgDetails = useSelector(state => state.pgDetails.pgDetails)
    const [selectedPg, setSelectedPg] = useState('')
    const history = useHistory()

    const handleSelectPg = (pgId) => {
        setSelectedPg(pgId)
    }

    const handleNext = () => {
        if (selectedPg) {
        // Redirect to the AddRoom component with the selected PG's ID
        history.push(`/addroom/${selectedPg}`)
        }
    }

    return (
        <div>
        <h2>Select PG</h2>
        {pgDetails.map((pg) => (
            <div key={pg._id}>
            <input
                type="radio"
                id={`pg_${pg._id}`}
                name="selectedPg"
                value={pg._id}
                checked={selectedPg === pg._id}
                onChange={() => handleSelectPg(pg._id)}
            />
            <label htmlFor={`pg_${pg._id}`}>{pg.name}</label>
            </div>
        ))}
        <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default SelectPg
