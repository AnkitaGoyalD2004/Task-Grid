import { CloudUpload, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAgentLists, getAgents, uploadList } from '../services/api';

const ListManagement = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [agents, setAgents] = useState([]);
  const [distributedLists, setDistributedLists] = useState({});

  useEffect(() => {
    const initializePage = async () => {
      const agentsData = await fetchAgents();
      if (agentsData.length > 0) {
        const lists = {};
        for (const agent of agentsData) {
          const agentLists = await getAgentLists(agent._id);
          lists[agent._id] = agentLists;
        }
        setDistributedLists(lists);
      }
    };
    initializePage();
  }, []);

  const fetchAgents = async () => {
    try {
      const data = await getAgents();
      setAgents(data);
      return data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file details:', {
      name: selectedFile?.name,
      type: selectedFile?.type,
      size: selectedFile?.size
    });
    
    const fileExtension = selectedFile?.name.split('.').pop().toLowerCase();
    
    if (selectedFile && fileExtension === 'csv') {
      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    } else {
      setFile(null);
      setMessage({ 
        type: 'error', 
        text: 'Please select a CSV file'
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadList(formData);
      console.log('Upload response:', response);
      
      // Refresh data after successful upload
      const agentsData = await fetchAgents();
      if (agentsData.length > 0) {
        const lists = {};
        for (const agent of agentsData) {
          const agentLists = await getAgentLists(agent._id);
          lists[agent._id] = agentLists;
        }
        setDistributedLists(lists);
      }
      
      setMessage({ type: 'success', text: 'File uploaded and distributed successfully' });
      setFile(null);
      
      const fileInput = document.getElementById('file-upload');
      if (fileInput) {
        fileInput.value = '';
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Upload error details:', {
        status: error.response?.status,
        message: error.response?.data,
        error: error
      });
      
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Server error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Upload List
        </Typography>
        
        <Box sx={{ width: '100%', textAlign: 'center', my: 3 }}>
          <input
            accept=".csv"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              Select File
            </Button>
          </label>
          
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2, width: '100%' }}>
            {message.text}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload and Distribute'}
        </Button>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Distributed Lists
        </Typography>
        
        {agents.map((agent) => (
          <Accordion key={agent._id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{agent.name}'s List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {distributedLists[agent._id]?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default ListManagement;