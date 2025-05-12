import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBOLById, updateBOL } from '../../utilities/bols-api';
import './EditBol.css';


export default function EditBol() {
 const { id } = useParams();
 const navigate = useNavigate();
 const [formData, setFormData] = useState(null);
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   async function fetchBOL() {
     try {
       const data = await getBOLById(id);
       setFormData({
         ...data,
         date: new Date(data.date).toISOString().split('T')[0]
       });
     } catch (error) {
       console.error('Error fetching BOL:', error);
     } finally {
       setLoading(false);
     }
   }
   fetchBOL();
 }, [id]);


 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await updateBOL(id, formData);
     navigate(`/bol/${id}`);
   } catch (error) {
     console.error('Error updating BOL:', error);
   }
 };


 if (loading) return <div>Loading...</div>;
 if (!formData) return <div>BOL not found</div>;


 return (
   <div className="edit-bol">
     <h1>Edit Bill of Lading</h1>
     <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label>Load Number:</label>
         <input
           type="text"
           name="loadNumber"
           value={formData.loadNumber}
           onChange={handleChange}
           required
         />
       </div>


       <div className="form-group">
         <label>Date:</label>
         <input
           type="date"
           name="date"
           value={formData.date}
           onChange={handleChange}
         />
       </div>


       <div className="form-group">
         <label>Shipper:</label>
         <input
           type="text"
           name="shipper"
           value={formData.shipper}
           onChange={handleChange}
           required
         />
       </div>


       <div className="form-group">
         <label>Consignee:</label>
         <input
           type="text"
           name="consignee"
           value={formData.consignee}
           onChange={handleChange}
           required
         />
       </div>


       <div className="form-group">
         <label>Rate ($):</label>
         <input
           type="number"
           name="rate"
           value={formData.rate}
           onChange={handleChange}
           min="0"
           step="0.01"
           required
         />
       </div>


       <div className="form-group">
         <label>Miles:</label>
         <input
           type="number"
           name="miles"
           value={formData.miles}
           onChange={handleChange}
           min="0"
         />
       </div>


       <div className="form-group">
         <label>Status:</label>
         <select
           name="status"
           value={formData.status}
           onChange={handleChange}
         >
           <option value="Pending">Pending</option>
           <option value="Paid">Paid</option>
           <option value="Disputed">Disputed</option>
         </select>
       </div>


       <button type="submit" className="btn-submit">Update BOL</button>
     </form>
   </div>
 );
}
