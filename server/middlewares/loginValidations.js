// External Library for validation
const { celebrate, Joi } = require('celebrate');

// Validate credentials
let validatePostLogin = celebrate({
    body: Joi.object().keys({
      login: Joi.string().required().email({ minDomainSegments: 2}),
      password: Joi.string().required()
    })
},{
  abortEarly: false
});

module.exports = {
  validatePostLogin
}
