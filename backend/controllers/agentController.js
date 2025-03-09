const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

const agentController = {
  // Create new agent
  createAgent: async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body;
      const agent = new Agent({ name, email, mobile, password });
      await agent.save();
      res.status(201).json({ message: 'Agent created successfully', agent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all agents
  getAgents: async (req, res) => {
    try {
      const agents = await Agent.find().select('-password');
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single agent
  getAgent: async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id).select('-password');
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = agentController;