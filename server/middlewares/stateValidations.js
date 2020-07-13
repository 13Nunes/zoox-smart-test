// External Library for validation
const { celebrate, Joi } = require('celebrate');

// Validate body data
let validateBodyState = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    code: Joi.string().required()
  })
},{
  abortEarly: false
});

module.exports = {
  validateBodyState
}
