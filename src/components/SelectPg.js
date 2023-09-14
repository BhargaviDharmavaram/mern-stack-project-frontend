// import React from 'react';
// import { useSelector } from 'react-redux';

// function SelectPg(props) {
//     const pgDetails = useSelector(state => state.pgDetails.pgDetails)
//     console.log(pgDetails)
  
//     return(
//         <div>
//             <h2>Select PG</h2>
//             {pgDetails.map((pg) => (
//                 <div key={pg._id}>
//                     <input
//                         type="radio"
//                         id={`pg_${pg._id}`}
//                         name="selectedPg"
//                         value={pg._id}
//                     />
//                     <label>{pg.name}</label>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default SelectPg
