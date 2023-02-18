const { Router } = require('express');
const authenticate = require('../controller/auth.controller');
const { body, check} = require('express-validator');
const badRequest = require('../middleware/badrequest');

const routes = Router();

routes.post('/auth',[
  body('uid')
    .not().isEmpty().withMessage("uid must be provided")
    .isLength({min: 7}).withMessage("uid min length is 7"),
  body('key')
    .not().isEmpty().withMessage("key must be provided")
    .isLength({min: 8}).withMessage("uid min length is 8"),
  badRequest
] ,authenticate);

module.exports = routes;