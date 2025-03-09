import { FormatListBulleted, PeopleAlt } from '@mui/icons-material';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container 
      sx={{ 
        minHeight: 'calc(100vh - 64px)', // Account for navbar height
        display: 'flex',
        flexDirection: 'column',
        
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        py: 4
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          mb: 4
        }}
      >
        Welcome to Task Grid
      </Typography>

      <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap', // Ensures proper alignment in small screens
    gap: { xs: 2, md: 6 },
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center', // Centers vertically
    width: '100%',
    maxWidth: '1200px',
    px: { xs: 2, md: 4 },
  }}
>
        <Paper
          elevation={3}
          onClick={() => navigate('/agents')}
          sx={{
            p: { xs: 3, md: 5 },
            flex: 1,
            maxWidth: '500px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'rgba(33, 150, 243, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
              bgcolor: 'rgba(33, 150, 243, 0.15)'
            }
          }}
        >
          <PeopleAlt sx={{ 
            fontSize: { xs: 48, md: 64 }, 
            color: 'primary.main', 
            mb: 3 
          }} />
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 500,
              mb: 2 
            }}
          >
            Agents
          </Typography>
          <Typography 
            color="text.secondary" 
            align="center"
            variant="h6"
          >
            Manage your agents and their assignments
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          onClick={() => navigate('/lists')}
          sx={{
            p: { xs: 3, md: 5 },
            flex: 1,
            maxWidth: '500px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'rgba(76, 175, 80, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
              bgcolor: 'rgba(76, 175, 80, 0.15)'
            }
          }}
        >
          <FormatListBulleted sx={{ 
            fontSize: { xs: 48, md: 64 }, 
            color: 'success.main', 
            mb: 3 
          }} />
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 500,
              mb: 2 
            }}
          >
            Lists
          </Typography>
          <Typography 
            color="text.secondary" 
            align="center"
            variant="h6"
          >
            Upload and distribute task lists
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;