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
* Fecha de creación: Feb 17, 2023
*/

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const ClabeDb = require('../db/clabe.db');
const clabeDb = new ClabeDb();

const privateKey = process.env.PRIVATE_KEY;

/**
 * Autenticación de usuario
 * @param {*} uid 
 * @param {*} key 
 * @returns 
 */
const authenticateUser = async (uid = "", key = "") => {

  const [user, tk] = await Promise.all([getRole(uid, key), uuidv4()]);
  const payload = { r: user.role, uid: user.uid, tk }
  const token = await getJwt(payload);

  return {token};
};

/**
 * Construye el JWT
 * @param {*} payload 
 * @returns 
 */
const getJwt = (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, privateKey, (error, token) => {
      if(error){
        console.error(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

/**
 * Consulta a la base de datos para buscar al si existe el usuario
 * @param {*} uid 
 * @param {*} key 
 * @returns 
 */
const getRole = (uid = "", key = "") => {
  return new Promise((resolve, reject) => {

    const query = `SELECT role FROM user WHERE user.uid="${uid}" AND user.key="${key}" `;

    clabeDb.query(query, (error, result, fields) => {
      if (result.length === 1) {
        resolve({ role: result[0].role, uid });
      } else {
        reject({ code: 400, info: "uid/key not found" });
      }
    });
  });
};


module.exports = { authenticateUser } 