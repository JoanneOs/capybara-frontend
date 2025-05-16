// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getBOLById } from '../../utilities/bols-api';
// import './BolDetail.css';


// export default function BolDetail() {
//  const { id } = useParams();
//  const [bol, setBol] = useState(null);
//  const [loading, setLoading] = useState(true);


//  useEffect(() => {
//    async function fetchBOL() {
//      try {
//        const data = await getBOLById(id);
//        setBol(data);
//      } catch (error) {
//        console.error('Error fetching BOL:', error);
//      } finally {
//        setLoading(false);
//      }
//    }
//    fetchBOL();
//  }, [id]);


//  if (loading) return <div>Loading...</div>;
//  if (!bol) return <div>BOL not found</div>;


//  return (
//    <div className="bol-detail">
//      <h1>Bill of Lading Details</h1>
//      <div className="bol-info">
//        <p><strong>Load Number:</strong> {bol.loadNumber}</p>
//        <p><strong>Date:</strong> {new Date(bol.date).toLocaleDateString()}</p>
//        <p><strong>Shipper:</strong> {bol.shipper}</p>
//        <p><strong>Consignee:</strong> {bol.consignee}</p>
//        <p><strong>Rate:</strong> ${bol.rate.toFixed(2)}</p>
//        <p><strong>Miles:</strong> {bol.miles || 'N/A'}</p>
//        <p><strong>Status:</strong> <span className={`status-${bol.status.toLowerCase()}`}>{bol.status}</span></p>
//      </div>


//      <div className="bol-actions">
//        <Link to="/bol" className="btn-back">Back to List</Link>
//        <Link to={`/bol/edit/${bol._id}`} className="btn-edit">Edit</Link>
//      </div>
//    </div>
//  );
// }

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBOLById } from '../../utilities/bols-api';
import './BolDetail.css';

export default function BolDetail() {
  const { id } = useParams();
  const [bol, setBol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBOL() {
      try {
        const data = await getBOLById(id);
        setBol(data);
      } catch (error) {
        console.error('Error fetching BOL:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBOL();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!bol) return <div>BOL not found.</div>;

  return (
    <div className="bol-detail">
      <h1>BOL Details</h1>
      <div className="details-container">
        <h3>Load #: {bol.loadNumber}</h3>
        <p>Date: {new Date(bol.date).toLocaleDateString()}</p>
        <p>Shipper: {bol.shipper}</p>
        <p>Consignee: {bol.consignee}</p>
        <p>Rate: ${bol.rate}</p>
        <p>Miles: {bol.miles}</p>
        <p>Status: <span className={`status-${bol.status.toLowerCase()}`}>{bol.status}</span></p>

        {bol.image?.url && (
          <div className="image-section">
            <h4>BOL Document:</h4>
            <img 
              src={bol.image.url} 
              alt="BOL Proof" 
              className="bol-image"
            />
          </div>
        )}

        <div className="action-buttons">
          <Link to={`/bol/edit/${bol._id}`} className="btn edit-btn">Edit</Link>
          <Link to="/bol" className="btn back-btn">Back to List</Link>
        </div>
      </div>
    </div>
  );
}