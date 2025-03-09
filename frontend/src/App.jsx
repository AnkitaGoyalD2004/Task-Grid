import { Box } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Agents from './pages/AgentManagement';
import Dashboard from './pages/Dashboard';
import Lists from './pages/ListManagement';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Box sx={{ 
        minHeight: '100vh',
        paddingTop: isAuthenticated ? '64px' : 0 // Add padding when navbar is present
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/agents" 
            element={isAuthenticated ? <Agents /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/lists" 
            element={isAuthenticated ? <Lists /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
