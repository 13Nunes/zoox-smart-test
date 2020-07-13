const mongoose = require('mongoose');

// Create city schema 
const citySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
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
const CityModel = new mongoose.model('City', citySchema);

module.exports = CityModel