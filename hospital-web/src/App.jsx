import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { Activity } from 'lucide-react';

const Dashboard = () => <div className="p-10 text-center text-2xl font-bold text-green-600">Hospital Dashboard (Protected)</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-800">
        {/* Navbar */}
        <nav className="p-4 bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Activity className="text-primary w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-primary tracking-tight">Sontya <span className="text-gray-400 font-normal">| Hospital</span></h1>
          </div>
        </nav>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;