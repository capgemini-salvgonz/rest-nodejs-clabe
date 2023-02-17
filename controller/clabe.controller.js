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
* Fecha de creación: Feb 13, 2023
*/

const { request, response } = require('express');
const { isValid, describe, buildClabe } = require('../service/clabe.service');

/* 
* Controller for Rest API  - POST /v1/api/clabe/util 
* op=validate  | Valida si la cuenta clabe esta bien construida
* op=describe  | Describe como esta formada la cuenta clabe
*/
const util = async (req = request, res = response) => {
  // const params = req.params; Path variables
  const { op } = req.query;
  const { clabe } = req.body;

  switch (op) {
    case 'validate':
      validateClabe(clabe, res);
      break;
    case 'describe':
      describeClabe(clabe, res);
      break;
  }
}


/**
 * Valida si la cuenta clabe esta bien construida
 * @param {*} clabe 
 * @param {*} res 
 */
const validateClabe = async (clabe = '', res = response) => {
  isValid(clabe).then(response => {
    const { status, info } = response;
    res.status(200).json({ status, info });
  }).catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
}

/**
 * Describe como esta formada una cuenta clabe
 * @param {*} clabe 
 * @param {*} res 
 */
const describeClabe = async (clabe = '', res = response) => {
  describe(clabe).then(result => {
    const [{ status }, bank, locations] = result;
    res.status(200).json({ validation: status, bank, locations });
  }).catch(error => {
    res.status(400).json({ error });
  });

}

/* 
* Controller for Rest API  - POST /v1/api/clabe 
* Crea la cuenta clabe basado en en tres parametros
*    1) Banco 
*    2) Plaza 
*    3) Numero de cuenta
*/
const createClabe = async (req = request, res = response) => {
  const { bank, location, account } = req.body;

  try {
    const clabe = await buildClabe(bank, location, account);
    res.status(200).json({ clabe });
  } catch (error) {
    res.status(400).json({ info: "Bad request" });
  }
}

module.exports = { util, createClabe };
