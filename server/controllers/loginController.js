const jwt = require('jsonwebtoken');

class LoginController{
  async index (request, response) {
    // Post data
    const { 
      login, 
      password
    } = request.body;

    // JWT PAYLOAD: Public data
    const payload = {
      login,
      uname: "Visitante",
      uplang: 'pt-br'
    };

    // JWT OPTIONS: Token info
    const options = {
      expiresIn: process.env.USER_AUTH_MAX_AGE,
      algorithm: process.env.USER_AUTH_ALGORITHM
    };

    // JWT Generate token
    const token = jwt.sign(payload, process.env.USER_AUTH_SECRET_KEY, options);

    // Output
    return response.json({
      success: true,
      token
    });
  }
}

module.exports = LoginController;