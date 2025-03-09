import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { createAgent, getAgents } from '../services/api';

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+91', // Default country code for India
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const data = await getAgents();
      setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAgent({ name: '', email: '', mobile: '', password: '' });
  };

  const handleChange = (e) => {
    setNewAgent({
      ...newAgent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!newAgent.name || !newAgent.email || !newAgent.mobile || !newAgent.password) {
      setError('All fields are required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAgent.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate mobile number (without country code)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(newAgent.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    const fullMobileNumber = `${newAgent.countryCode}${newAgent.mobile}`;

    setLoading(true);
    try {
      await createAgent({ ...newAgent, mobile: fullMobileNumber });
      handleClose();
      fetchAgents();
      setSuccessMessage('Agent added successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating agent');
    } finally {
      setLoading(false);
    }
  };

  // Replace the mobile TextField in the Dialog with this:
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <Typography component="h2" variant="h6" color="primary">
            Agents
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Agent
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent._id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.mobile}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            required
            value={newAgent.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={newAgent.email}
            onChange={handleChange}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="country-code-label">Code</InputLabel>
                <Select
                  labelId="country-code-label"
                  value={newAgent.countryCode}
                  label="Code"
                  name="countryCode"
                  onChange={handleChange}
                >
                  <MenuItem value="+91">+91 (IN)</MenuItem>
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+61">+61 (AU)</MenuItem>
                  <MenuItem value="+86">+86 (CN)</MenuItem>
                  {/* Add more country codes as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="dense"
                name="mobile"
                label="Mobile Number"
                fullWidth
                required
                value={newAgent.mobile}
                onChange={handleChange}
                helperText="Enter 10-digit mobile number"
              />
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={newAgent.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AgentManagement;