const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  notes: String,
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);