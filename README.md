# Task-Grid
A modern task management app.

#Setup  
1. Clone the repo.
2. Run `npm install`
3. Run `npm start`

API Endpoints:

Auth Routes

1.POST /api/auth/login - User Login
2.POST /api/auth/register - User Registration

Protected Routes
1.GET /api/agents - Get all agents
2.POST /api/agents - Create an agent
3.GET /api/lists/:agentId - Get all lists for an agent
4.POST /api/lists - Upload new list
