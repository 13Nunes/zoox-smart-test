let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, process.env.USER_AUTH_SECRET_KEY, { algorithm: process.env.USER_AUTH_ALGORITHM }, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Invalid token.'
          });
        } else {
          // Save decoded token on request
          req.decoded = decoded;
          
          next();
        }
      });
    } else {
      return res.status(500).json({
        error: 'Invalid token.'
      });
    }
  } else {
    return res.status(500).json({
      error: "Not Authorized."
    });
  }
};

module.exports = {
  checkToken
}
