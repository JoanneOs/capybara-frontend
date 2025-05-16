import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBOLs } from '../../utilities/bols-api';
import './BolList.css';


export default function BolList() {
 const [bols, setBols] = useState([]);
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   async function fetchBOLs() {
     try {
       const data = await getAllBOLs();
       setBols(data);
     } catch (error) {
       console.error('Error fetching BOLs:', error);
     } finally {
       setLoading(false);
     }
   }
   fetchBOLs();
 }, []);


 if (loading) return <div>Loading...</div>;


 return (
   <div className="bol-list">
     <h1>Bills of Lading</h1>
     <Link to="/bol/add" className="btn-add">Add New BOL</Link>
    
     <div className="bol-grid">
       {bols.map(bol => (
         <div key={bol._id} className="bol-card">
           <h3>Load #: {bol.loadNumber}</h3>
           <p>Shipper: {bol.shipper}</p>
           <p>Consignee: {bol.consignee}</p>
           <p>Status: <span className={`status-${bol.status.toLowerCase()}`}>{bol.status}</span></p>
           <div className="bol-actions">
             <Link to={`/bol/${bol._id}`} className="btn-view">View</Link>
             <Link to={`/bol/edit/${bol._id}`} className="btn-edit">Edit</Link>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}
