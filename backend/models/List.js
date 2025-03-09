const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  items: [{
    firstName: String,
    phone: String,
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('List', listSchema);