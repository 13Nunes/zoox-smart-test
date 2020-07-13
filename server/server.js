// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const routes = require('./routes');
const { errors } = require('celebrate');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Connection
require('./database/connection');

// Init
const app = express();

// Proxy
app.set('trust proxy', true);

// Cors support
app.use(cors());

// Security headers
app.use(helmet());

// Protects from DDoS and brute force attacks
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 1, // Per second
});
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
});

// JSON support
app.use(express.json());

// Routes
app.use(routes);

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Zoox Smart Test API",
      description: "Zoox Smart Test API Information",
      contact: {
        name: "Fernando Nunes",
        email: "onlyfernando@gmail.com",
        url: "https://13nunes.github.io/fernandonunes/"
      },
      servers: ["http://localhost:3333"]
    }
  },
  apis: ["routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Erros
app.use(errors());

// Export app
module.exports = app;
