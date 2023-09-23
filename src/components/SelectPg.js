// import React, { useState} from 'react'
// import { useSelector,useDispatch} from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { startDestroyPg} from '../actions/pgDetailsActions'

// function SelectPg(props) {
//     const pgDetails = useSelector(state => state.pgDetails.pgDetails)
//     const [selectedPg, setSelectedPg] = useState('')
//     const history = useHistory()
//     const handleSelectPg = (pgId) => {
//         setSelectedPg(pgId)
//     }

//     const handleNext = () => {
//         if (selectedPg) {
//         // Redirect to the AddRoom component with the selected PG's ID
//         history.push(`/admindashboard/${selectedPg}`)
//         }
//     }

//     const handleEdit= (pgDetailsId) => {
//         // Redirect to the EditPG component with the selected PG's ID
//         history.push(`/edit-pg/${pgDetailsId}`)
//     }
    
//     const dispatch = useDispatch()

//     const handleRemove = (pgDetailsId) => {
//         dispatch(startDestroyPg(pgDetailsId))
//     }

//     return (
//         <div>
//         <h2>Select PG</h2>
//         {pgDetails.map((pg) => (
//             <div key={pg._id}>
//             <input
//                 type="radio"
//                 id={`pg_${pg._id}`}
//                 name="selectedPg"
//                 value={pg._id}
//                 checked={selectedPg === pg._id}
//                 onChange={() => handleSelectPg(pg._id)}
//             />
//             <label>{pg.name}</label>
//             <button onClick={() => handleEdit(pg._id)}>Edit</button>
//             <button onClick={() => handleRemove(pg._id)}>Remove</button>
//             </div>
//         ))}
//         <button onClick={handleNext}>Next</button>
//         </div>
//     )
// }

// export default SelectPg

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startDestroyPg } from '../actions/pgDetailsActions';
import { FaEdit, FaTrash } from 'react-icons/fa'

const SelectPg = (props) =>{
    const pgDetails = useSelector((state) => state.pgDetails.pgDetails)
    const [selectedPg, setSelectedPg] = useState('')
    const history = useHistory()

    const handleSelectPg = (pgId) => {
        setSelectedPg(pgId)
    }

    const handleNext = () => {
        if (selectedPg) {
        // Redirect to the AddRoom component with the selected PG's ID
        history.push(`/admindashboard/${selectedPg}`)
        }
    }

    const handleEdit = (pgDetailsId) => {
        // Redirect to the EditPG component with the selected PG's ID
        history.push(`/edit-pg/${pgDetailsId}`)
    }

    const dispatch = useDispatch()

    const handleRemove = (pgDetailsId) => {
        const confirmation = window.confirm('Are You Sure?')
        if(confirmation){
            dispatch(startDestroyPg(pgDetailsId))
        }
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
            <h2 className="text-center">Select PG</h2>
            <div className="text-center">
                {pgDetails.map((pg) => (
                <div key={pg._id}>
                    <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        id={`pg_${pg._id}`}
                        name="selectedPg"
                        value={pg._id}
                        className="custom-control-input"
                        checked={selectedPg === pg._id}
                        onChange={() => handleSelectPg(pg._id)}
                    />
                    <label className="custom-control-label" htmlFor={`pg_${pg._id}`}>
                        {pg.name}
                    </label>
                    </div>
                    {/* <button style={{ backgroundColor: 'green',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                    onClick={() => handleEdit(pg._id)}
                    >
                    <FaEdit /> Edit
                    </button> */}
                    {/* <button
                    style={{ backgroundColor: 'red',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
                    onClick={() => handleRemove(pg._id)}
                    >
                    <FaTrash /> Remove
                    </button> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="icon-button" style={{ marginRight: "10px" }}>
                            <FaEdit onClick={() => handleEdit(pg._id)} style={{ color: "blue" }} /><span>Edit</span>
                        </div>
                        <div className="icon-button">
                            <FaTrash onClick={() => handleRemove(pg._id)} style={{ color: "red" }} /><span>Remove</span>
                        </div>
                    </div>
                </div>
                ))}
                <button className="btn btn-primary" style={{marginTop : '10px'}} onClick={handleNext} disabled={!selectedPg}> Next </button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default SelectPg
