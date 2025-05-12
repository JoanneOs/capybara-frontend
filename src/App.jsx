import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import BolList from './components/BOL/BolList';
import AddBol from './components/BOL/AddBol';
import BolDetail from './components/BOL/BolDetail';
import EditBol from './components/BOL/EditBol';


export default function App() {
 return (
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/bol" element={<BolList />} />
     <Route path="/bol/add" element={<AddBol />} />
     <Route path="/bol/:id" element={<BolDetail />} />
     <Route path="/bol/edit/:id" element={<EditBol />} />
   </Routes>
 );
}
