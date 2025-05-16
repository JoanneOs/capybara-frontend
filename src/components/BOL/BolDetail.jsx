import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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

  // Determine file type (if any)
  const fileUrl = bol?.document?.url || bol?.image?.url || '';
  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);

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

        {fileUrl && (
          <div className="document-section">
            <h4>BOL Document:</h4>

            {isPDF && (
              <div style={{ height: '750px', border: '1px solid #ccc' }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer fileUrl={fileUrl} />
                </Worker>
              </div>
            )}

            {isImage && (
              <img
                src={fileUrl}
                alt="BOL Proof"
                className="bol-image"
              />
            )}

            {!isPDF && !isImage && (
              <p>Unsupported file format.</p>
            )}
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
