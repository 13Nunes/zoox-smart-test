// Imports
const express = require('express');

// Controllers
const LoginController = require("./controllers/loginController");
const StateController = require('./controllers/stateController');
const CityController = require('./controllers/cityController');

// Middlewares
const { validatePostLogin } = require("./middlewares/loginValidations");
const { validateBodyState } = require("./middlewares/stateValidations");
const { validateBodyCity } = require("./middlewares/cityValidations");
const { checkToken } = require("./middlewares/jwtCheckToken");

// Init router
const routes = express.Router();

// Controllers instance
const loginController = new LoginController();
const stateControler = new StateController();
const cityController = new CityController();

/**
 * @swagger
 * definitions:
 *   State:
 *     properties:
 *       title:
 *         type: string
 *       code:
 *         type: string
 *   City:
 *     properties:
 *       title:
 *         type: string
 *       stateId:
 *         type: string
 *   Credential:
 *     properties:
 *       login:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 */

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */


// Resource :: Login
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     description: Authenticate and get token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: credentials
 *         description: Credentials object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Credential'
 *     responses:
 *       200:
 *         description: Successfully authenticated
 */
routes.post('/login', validatePostLogin, loginController.index);

// Resourse :: States
/**
 * @swagger
 * /states:
 *  get:
 *    tags:
 *      - States
 *    security:
 *      - Bearer: []
 *    description: Use to request all states
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: filter
 *        in: query
 *        description: Filter state
 *        type: string
 *        required: false
 *      - name: sort
 *        in: query
 *        description: Ordenation (asc or desc)
 *        type: string
 *        required: false
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get('/states', checkToken, stateControler.index);

/**
 * @swagger
 * /states/{id}:
 *   get:
 *     tags:
 *       - States
 *     security:
 *       - Bearer: []
 *     description: Returns a single state
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: state's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single state
 */
routes.get('/states/:stateId', checkToken, stateControler.show);

/**
 * @swagger
 * /states:
 *   post:
 *     tags:
 *       - States
 *     security:
 *       - Bearer: []
 *     description: Creates a new state
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: state
 *         description: State object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/State'
 *     responses:
 *       200:
 *         description: Successfully created
 */
routes.post('/states', checkToken, validateBodyState, stateControler.create);

/**
 * @swagger
 * /states/{id}:
 *   put:
 *     tags:
 *       - States
 *     security:
 *       - Bearer: []
 *     description: Updates a single state
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: state's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: state
 *         description: State object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/State'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
routes.put('/states/:stateId', checkToken, validateBodyState, stateControler.edit);

/**
 * @swagger
 * /states/{id}:
 *   delete:
 *     tags:
 *       - States
 *     security:
 *       - Bearer: []
 *     description: Deletes a single state
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: state's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
routes.delete('/states/:stateId', checkToken, stateControler.remove);

// Resourse :: Cities
/**
 * @swagger
 * /cities:
 *  get:
 *    tags:
 *      - Cities
 *    security:
 *      - Bearer: []
 *    description: Use to request all cities
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: filter
 *        in: query
 *        description: Filter city
 *        type: string
 *        required: false
 *      - name: sort
 *        in: query
 *        description: Ordenation (asc or desc)
 *        type: string
 *        required: false
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get('/cities', checkToken, cityController.index);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     tags:
 *       - Cities
 *     security:
 *       - Bearer: []
 *     description: Returns a single city
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: city's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single city
 */
routes.get('/cities/:cityId', checkToken, cityController.show);

/**
 * @swagger
 * /cities:
 *   post:
 *     tags:
 *       - Cities
 *     security:
 *       - Bearer: []
 *     description: Creates a new city
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: city
 *         description: City object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/City'
 *     responses:
 *       200:
 *         description: Successfully created
 */
routes.post('/cities', checkToken, validateBodyCity, cityController.create);

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     tags:
 *       - Cities
 *     security:
 *       - Bearer: []
 *     description: Updates a single city
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: city's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: city
 *         description: city object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/City'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
routes.put('/cities/:cityId', checkToken, validateBodyCity, cityController.edit);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     tags:
 *       - Cities
 *     security:
 *       - Bearer: []
 *     description: Deletes a single city
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: city's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
routes.delete('/cities/:cityId', checkToken, cityController.remove);

module.exports = routes;
