import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterChild from './pages/RegisterChild';

// Placeholder for History (Coming next)
const VaccinationRecords = () => (
  <div className="flex bg-background min-h-screen">
    {/* Temporary inline Sidebar for placeholder */}
    <div className="w-64 bg-white border-r h-screen fixed"></div> 
    <div className="ml-64 p-10 font-bold text-gray-400">Vaccination History Page (Coming Soon)</div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-800">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register-child" element={<RegisterChild />} />
          <Route path="/vaccination-records" element={<VaccinationRecords />} />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;