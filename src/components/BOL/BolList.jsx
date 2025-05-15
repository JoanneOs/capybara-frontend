import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllBOLs } from '../../utilities/bols-api';
import './BolList.css';

export default function BolList() {
  const [bols, setBols] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBOLs() {
      try {
        const data = await getAllBOLs();
        setBols(data);
      } catch (error) {
        console.error('Error fetching BOLs:', error);
        // Optional: show error to user
      } finally {
        setLoading(false);
      }
    }
    fetchBOLs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/bol/edit/${id}`);
  };

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
              <button 
                onClick={() => handleEdit(bol._id)} 
                className="btn-edit"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}