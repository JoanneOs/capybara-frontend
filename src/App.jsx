import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BolList from './pages/BOL/BolList';
import AddBol from './pages/BOL/AddBol';
import BolDetail from './pages/BOL/BolDetail';
import EditBol from './pages/BOL/EditBol';


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
