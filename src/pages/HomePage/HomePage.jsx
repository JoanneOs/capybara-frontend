import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
 return (
   <div className="home-container">
     <header className="hero-section">
       <h1>Welcome to BOL System</h1>
       <p>Manage your Bills of Lading efficiently</p>
     </header>
     <main className="cta-section">
       <Link to="/bol" className="cta-button">
         View BOL Dashboard
       </Link>
     </main>

    
  
   </div>
 );
}
