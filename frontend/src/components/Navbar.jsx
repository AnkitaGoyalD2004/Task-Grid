// import { AppBar, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <AppBar position="fixed">
//         <Typography 
//           variant="h6" 
//           component="div" 
//           sx={{ flexGrow: 1, cursor: 'pointer' }}
//           onClick={() => navigate('/dashboard')}
//         >
//           Task Grid
//         </Typography>
    
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
       
//     </AppBar>
//   );
// };

// export default Navbar;
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Task Grid
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          
         
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;