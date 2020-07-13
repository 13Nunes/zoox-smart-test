// Imports
const StateModel = require("../models/state");
const moment = require('moment-timezone');

class StateController{
  async index (request, response) {
    // Query string param
    let { filter, sort } = request.query;

    // Prepare filter and ordenation
    filter = filter ? { title: { $regex: `^${filter}.*`, $options: "i" } } : {};
    sort = (sort === 'asc' || sort === 'desc') ? sort : 'asc';

    try{
      // Find states
      StateModel.find(filter).sort({title: sort})
        .then((states) => {
          // Apply timezone
          states = JSON.parse(JSON.stringify(states))
          states.forEach((state, i, states) => {
            states[i].createdAt = moment.tz(state.createdAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
            states[i].updatedAt = moment.tz(state.updatedAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
          })

          // Output
          return response.json({
            success: true,
            data: states
          });
        })
        .catch(err => {
          return response.json({
            success: false,
            message: 'Error on parse states.'
          });
        })

    } catch(err) {
      return response.json({
        success: false
      });
    }
  }

  async show (request, response) {
    // Param data
    const { stateId } = request.params;

    try{
      // Find city
      StateModel.findById(stateId)
        .then((state) => {
          // Apply timezone
          state = state.toJSON();
          state.createdAt = moment.tz(state.createdAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
          state.updatedAt = moment.tz(state.updatedAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");

          // Output
          return response.json({
            success: true,
            data: state
          });
        })
        .catch(err => {
          return response.json({
            success: false,
            message: 'State not found.'
          });
        })
    } catch(err) {
      return response.json({
        success: false,
        message: 'Server error'
      });
    }
  }

  async create (request, response) {
    // Post data
    const { title, code } = request.body;

    try{
      // Create state
      const state = await StateModel.create({ title, code });

      // Output
      return response.json({
        success: true,
        data: state
      });
    }catch(err) {
      return response.json({
        success: false
      });
    }
  }

  async edit (request, response) {
    // Param data
    const { stateId } = request.params;

    // Post data
    const { title, code } = request.body;

    try{
      // Create state
      const state = await StateModel.findByIdAndUpdate(stateId, { 
        title, 
        code, 
        updatedAt: Date.now()
      }, {new: true});

      // Output
      return response.json({
        success: true,
        data: state
      });
    } catch(err) {
      return response.json({
        success: false
      });
    }
  }

  async remove (request, response) {
    // Param data
    const { stateId } = request.params;

    try{
      // Create state
      const state = await StateModel.findByIdAndDelete(stateId);

      // Output
      return response.json({
        success: true,
        data: state
      });
    } catch(err) {
      return response.json({
        success: false
      });
    }
  }
}

module.exports = StateController;
