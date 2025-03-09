const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');

router.post('/', auth, agentController.createAgent);
router.get('/', auth, agentController.getAgents);
router.get('/:id', auth, agentController.getAgent);

module.exports = router;