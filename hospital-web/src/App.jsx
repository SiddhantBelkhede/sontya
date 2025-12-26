import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Login = () => <div className="p-10 text-center text-2xl font-bold text-primary">Hospital Login Page (Coming Soon)</div>;
const Dashboard = () => <div className="p-10 text-center text-2xl font-bold text-green-600">Hospital Dashboard (Protected)</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-800">
        <nav className="p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-primary">Sontya Hospital Portal</h1>
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