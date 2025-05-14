import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBOL } from '../../utilities/bols-api';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // added for form state/validation
import * as Yup from 'yup'; // added for validation schema


import './AddBol.css';


// validation schema using yup
const bolSchema = Yup.object().shape({
  loadNumber: Yup.string().required('Load Number is required'),
  shipper: Yup.string().required('Shipper is required'),
  consignee: Yup.string().required('Consignee is required'),
  rate: Yup.number().required('Rate is required').min(0, 'Rate must be positive'),
  miles: Yup.number().min(0, 'Miles must be positive'),
  status: Yup.string().oneOf(['Pending', 'Paid', 'Disputed'], 'Invalid status'),
  image: Yup.mixed() // optional file input
    .nullable()
    .test('fileSize', 'File size must be less than 2MB', (value) => !value || value.size <= 2 * 1024 * 1024)
    .test('fileType', 'Invalid file type', (value) =>
      !value || ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
    ),
});

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
