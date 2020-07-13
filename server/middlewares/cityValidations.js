// External Library for validation
const { celebrate, Joi } = require('celebrate');

// Validate body data
let validateBodyCity = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    stateId: Joi.string().required()
  })
},{
  abortEarly: false
});

module.exports = {
    validateBodyCity
}
