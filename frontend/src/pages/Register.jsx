import { EmailOutlined, LockOutlined, PersonOutline } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // In the handleSubmit function
    try {
      await registerUser(formData);
      navigate('/login', { 
        state: { message: 'Registration successful! Please login with your credentials.' }
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              bgcolor: 'primary.main', 
              width: { xs: 56, md: 72 }, 
              height: { xs: 56, md: 72 } 
            }}
          >
            <LockOutlined sx={{ fontSize: { xs: 32, md: 40 } }} />
          </Avatar>
          
          <Typography 
            component="h1" 
            variant="h3" 
            sx={{ 
              mb: 1,
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            Task Grid
          </Typography>
          
          <Typography 
            component="h2" 
            variant="h4" 
            sx={{ 
              mb: 3,
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': {
                  height: 56
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': {
                  height: 56
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': {
                  height: 56
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& .MuiInputBase-root': {
                  height: 56
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4
                }
              }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Button
              fullWidth
              onClick={() => navigate('/login')}
              sx={{ 
                mt: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Already have an account? Sign in
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;