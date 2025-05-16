import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBOLById, updateBOL, deleteBOL } from '../../utilities/bols-api';
import './EditBol.css';

export default function EditBol() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false); // NEW: deletion state

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this BOL?');
    if (!confirmDelete) return;
    try {
      await deleteBOL(id);
      setDeleted(true); // Switch to confirmation view
    } catch (error) {
      console.error('Error deleting BOL:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/bol');// Redirect to BOL list
  };

  if (loading) return <div>Loading...</div>;
  if (!formData) return <div>BOL not found</div>;

  // Show Deleted confirmation instead of form
  if (deleted) {
    return (
      <div className="edit-bol deleted-confirmation">
        <h1>BOL Deleted</h1>
        <p><strong>Shipper:</strong> {formData.shipper}</p>
        <p><strong>Consignee:</strong> {formData.consignee}</p>
        <p><strong>Status:</strong> {formData.status}</p>
        <button onClick={handleBackToList} className="btn-ok">
          OK Back to List
        </button>
      </div>
    );
  }

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

        <div className="button-group">
          <button type="submit" className="btn-submit">Update BOL</button>
          <button type="button" className="btn-delete" onClick={handleDelete}>
            Delete BOL
          </button>
        </div>
      </form>
    </div>
  );
}