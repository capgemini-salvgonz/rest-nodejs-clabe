/*
*                     GNU GENERAL PUBLIC LICENSE
*                        Version 3, 29 June 2007
* 
*  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
*  Everyone is permitted to copy and distribute verbatim copies
*  of this license document, but changing it is not allowed.
* 
*                             Preamble
* 
*   The GNU General Public License is a free, copyleft license for
* software and other kinds of works.
* 
*   The licenses for most software and other practical works are designed
* to take away your freedom to share and change the works.  By contrast,
* the GNU General Public License is intended to guarantee your freedom to
* share and change all versions of a program--to make sure it remains free
* software for all its users.  We, the Free Software Foundation, use the
* GNU General Public License for most of our software; it applies also to
* any other work released this way by its authors.  You can apply it to
* your programs, too.
*
* Autor: salvgonz 
* Fecha de creación: Feb 14, 2023
*/

const { Router } = require('express');
const routes = Router();
const { body, query, header } = require('express-validator');
const { util, createClabe } = require('../controller/clabe.controller');
const badRequest = require('../middleware/badrequest');
const authenticate = require('../middleware/authenticate');

routes.post('/clabe/util', [
  header('Authorization').not().isEmpty().withMessage('Missing auth token'),
  query('op').isIn(['validate', 'describe']),
  body('clabe').isNumeric().withMessage('Is not a number')
    .isLength({ min: 18, max: 18 }).withMessage('Length must be 18'),
  badRequest,
  authenticate
], util);

routes.post('/clabe', [
  header('Authorization').not().isEmpty().withMessage('Missing auth token'),
  body('bank').isNumeric().isLength({ min: 1, max: 3 }),
  body('location').isNumeric().isLength({ min: 1, max: 3 }),
  body('account').isNumeric().isLength({ max: 11 }),
  badRequest,
  authenticate
], createClabe);

module.exports = routes;
