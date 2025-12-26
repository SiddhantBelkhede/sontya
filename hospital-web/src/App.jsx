import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterChild from './pages/RegisterChild';
// IMPORT THE NEW PAGE HERE
import VaccinationRecords from './pages/VaccinationRecords';

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