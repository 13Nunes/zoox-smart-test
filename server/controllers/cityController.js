// Imports
const CityModel = require("../models/city");
const moment = require('moment-timezone');

class CityController{
  async index (request, response) {
    // Query string param
    let { filter, sort } = request.query;

    // Prepare filter and ordenation
    filter = filter ? { title: { $regex: `^${filter}.*`, $options: "i" } } : {};
    sort = (sort === 'asc' || sort === 'desc') ? sort : 'asc';

    try{
      // Create state
      CityModel.find(filter).sort({title: sort}).populate('state')
        .then((cities) => {
          // Apply timezone
          cities = JSON.parse(JSON.stringify(cities))
          cities.forEach((city, i, cities) => {
            cities[i].createdAt = moment.tz(city.createdAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
            cities[i].updatedAt = moment.tz(city.updatedAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
          })

          // Output
          return response.json({
            success: true,
            data: cities
          });
        })
        .catch(err => {
          return response.json({
            success: false,
            message: 'Error on parse cities.'
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
    const { cityId } = request.params;

    try{
      // Find city
      CityModel.findById(cityId)
        .then((city) => {
          // Apply timezone
          city = city.toJSON();
          city.createdAt = moment.tz(city.createdAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
          city.updatedAt = moment.tz(city.updatedAt , "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");

          // Output
          return response.json({
            success: true,
            data: city
          });
        })
        .catch(err => {
          return response.json({
            success: false,
            message: 'City not found.'
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
    const { title, stateId } = request.body;

    try{
      // Create state
      const city = await CityModel.create({ title, state: stateId });

      // Output
      return response.json({
        success: true,
        data: city
      });
    }catch(err) {
      return response.json({
        success: false
      });
    }
  }

  async edit (request, response) {
    // Param data
    const { cityId } = request.params;

    // Post data
    const { title, stateId } = request.body;

    try{
      // Create state
      const city = await CityModel.findByIdAndUpdate(cityId, { 
        title, 
        state: stateId,
        updatedAt: Date.now()
      }, {new: true});

      // Output
      return response.json({
        success: true,
        data: city
      });
    } catch(err) {
      return response.json({
        success: false
      });
    }
  }

  async remove (request, response) {
    // Param data
    const { cityId } = request.params;

    try{
      // Create state
      const city = await CityModel.findByIdAndDelete(cityId);

      // Output
      return response.json({
        success: true,
        data: city
      });
    } catch(err) {
      return response.json({
        success: false
      });
    }
  }
}

module.exports = CityController;
