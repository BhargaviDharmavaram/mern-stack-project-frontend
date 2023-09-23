import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startShowPG } from "../actions/pgDetailsActions";
import searchPg from '../images/searchPg.jpg';

const PGList = (props) => {
    const allPgs = useSelector((state) => state.pgDetails.allPgs);
    console.log('allPgs', allPgs);

    const dispatch = useDispatch();
    const history = useHistory();
    
    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('');

    const handleShowPG = (pgDetailsId) => {
        console.log('pgId', pgDetailsId);
        dispatch(startShowPG(pgDetailsId));
        history.push(`/showPg/${pgDetailsId}`); // Navigate to ShowPG
    }

    // Filter the PGs based on the search query
    const filteredPgs = allPgs.filter((pg) => {
        // Convert both the name and address to lowercase for case-insensitive search
        const lowerCaseQuery = searchQuery.toLowerCase();
        const lowerCaseName = pg.name.toLowerCase();
        const lowerCaseAddress = pg.address.toLowerCase();

        // Check if either the name or address contains the search query
        return lowerCaseName.includes(lowerCaseQuery) || lowerCaseAddress.includes(lowerCaseQuery);
    });

    return (
        <div className="container" style={{marginTop : '10px'}}>
            <div className="row">
                <div className="col-md-6">
                    <img src={searchPg} alt="searchPg" className="img-fluid" />
                    <p className="mt-3">
                        Are you looking for a PG? Don't worry! We can help you find eco-friendly and budget-friendly accommodation near your workplace.
                    </p>
                    <p>
                        Our platform offers a wide selection of PG accommodations with various features and pricing options. Whether you're a student, a working professional, or just someone in need of a comfortable place to stay, you'll find something that suits your needs.
                    </p>
                    <p>
                        Use the search bar to find PGs by name or location, and discover details such as the number of available rooms, monthly rent, and any special features provided. Once you've found a PG that interests you, simply click "Show" to get more information.
                    </p>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">List of PGs</h1>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ul className="list-group">
                                {filteredPgs.map((pg) => (
                                    <li className="list-group-item d-flex justify-content-between" key={pg._id}>
                                        {pg.name}
                                        <button className="btn btn-primary" onClick={() => handleShowPG(pg._id)}>Show</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PGList;
