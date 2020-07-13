const passwordValidator = require('password-validator');
const passwordGenerator = require('generate-password');

// Validate password
const isValidPassword = (password) => {
  // Init
  let schema = new passwordValidator();

  // Schema
  schema
    .is().min(10)
    .is().max(30)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .has().symbols()
  // let failList = schema.validate(password, { list: true });
  return schema.validate(password);
};

// Generate password
const generatePassword = () => {
  const password = passwordGenerator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    exclude: '!%^&*()+_-=}{[]|:;"/?.><,`~',
    strict: true
  });
  return password;
}

const generatePasswordArray = (qty) => {
  const arr = passwordGenerator.generateMultiple(qty, {
    length: 10,
    symbols: true,
    uppercase: true,
    numbers: true,
    excludeSimilarCharacters: true,
    exclude: '!%^&*()+_-=}{[]|:;"/?.><,`~',
    strict: true
  });
  return arr;
}

module.exports = {
  isValidPassword,
  generatePassword,
  generatePasswordArray
}