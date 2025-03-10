import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Agents from './pages/AgentManagement';
import Dashboard from './pages/Dashboard';
import Lists from './pages/ListManagement';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      {isAuthenticated ? <Navbar setIsAuthenticated={setIsAuthenticated} /> : null}
      <Box sx={{ 
        minHeight: '100vh',
        paddingTop: isAuthenticated ? '64px' : 0 // Add padding when navbar is present
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route 
            path="/agents" 
            element={isAuthenticated ? <Agents /> : <Navigate to="/login" replace />}
          />
          <Route 
            path="/lists" 
            element={isAuthenticated ? <Lists /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;