const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agent');
const listRoutes = require('./routes/list');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

// MongoDB connection with improved error handling
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  console.log('Please check your MONGODB_URI in .env file');
  process.exit(1); // Exit process with failure
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});