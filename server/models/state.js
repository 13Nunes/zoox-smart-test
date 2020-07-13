const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Create state schema 
const stateSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
  },
  code: { 
    type: String, 
    required: true, 
    uppercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
const StateModel = new mongoose.model('State', stateSchema);

module.exports = StateModel
