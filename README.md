# Task Grid

A modern task management application built with React and Node.js.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Project Structure


## Setup Instructions


Backend Setup
1. Navigate to the backend directory:
cd backend
npm install

2. Start the backend server:
npm run dev

Frontend Setup
1. Navigate to the frontend directory:
cd frontend
npm install

2. Start the frontend development server:
npm run dev


## Trae AI
Used 1 Reference

Let's update the Login component's handleSubmit function to ensure proper redirection to the dashboard after successful login:

```javascript
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid login response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
 ```
```

And let's update the App.jsx to handle the protected routes properly:

```javascript
  // ... imports ...
  
  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
      };

      window.addEventListener('storage', checkAuth);
      checkAuth(); // Check auth status on mount
      return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
      <Router>
        {isAuthenticated && <Navbar />}
        <Box sx={{ 
          minHeight: '100vh',
          paddingTop: isAuthenticated ? '64px' : 0
        }}>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            {/* ... other routes ... */}
          </Routes>
        </Box>
      </Router>
    );
  }
 ```
```

These changes:

1. Add replace: true to prevent back navigation after login
2. Add proper error logging
3. Ensure authentication state is properly set
4. Check auth status on component mount
5. Handle route protection more effectively

## Ankita Goyal
Copy

Delete

now this is all done please make A README file with setup and execution instructions.

## Trae AI
Used 1 Reference

Login.jsx 217-217

I'll create a comprehensive README.md file for your Task Grid project:

```markdown
# Task Grid

A modern task management application built with React and Node.js.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Project Structure

 ```
```

Task-Grid/
├── frontend/     # React frontend application
└── backend/      # Node.js backend server

```plaintext

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
 ```

2. Install dependencies:
```bash
npm install
 ```

3. Create a .env file in the backend directory with the following variables:
```plaintext
PORT=5002
MONGODB_URI=mongodb://localhost:27017/taskgrid
JWT_SECRET=your_jwt_secret_key
 ```

4. Start the backend server:
```bash
npm start
 ```

The backend server will run on http://localhost:5002

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
 ```

2. Install dependencies:
```bash
npm install
 ```

3. Start the frontend development server:
```bash
npm start
 ```

The application will open in your default browser at http://localhost:3000

## Features
- User Authentication (Login/Register)
- Dashboard Overview
- Agent Management
- List Management
- Secure API Integration
- Responsive Design
## Tech Stack
### Frontend
- React
- Material-UI
- React Router
- Axios
### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
## Available Scripts
In both frontend and backend directories:

- npm start - Runs the application in development mode
- npm test - Launches the test runner
- npm run build - Builds the app for production
- npm run eject - Ejects from Create React App (frontend only)
## API Endpoints
### Auth Routes
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
### Protected Routes
- GET /api/agents - Get all agents
- POST /api/agents - Create new agent
- GET /api/lists/:agentId - Get lists for specific agent
- POST /api/lists/upload - Upload new list