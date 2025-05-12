import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBOL } from '../../utilities/bols-api';
import './AddBol.css';


export default function AddBol() {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
   loadNumber: '',
   shipper: '',
   consignee: '',
   rate: '',
   miles: '',
   status: 'Pending'
 });


 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await createBOL(formData);
     navigate('/bol');
   } catch (error) {
     console.error('Error creating BOL:', error);
   }
 };


 return (
   <div className="add-bol">
     <h1>Add New Bill of Lading</h1>
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


       <button type="submit" className="btn-submit">Create BOL</button>
     </form>
   </div>
 );
}
