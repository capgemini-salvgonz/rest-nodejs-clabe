const mysql = require('mysql');

class ClabeDb {

  constructor() {
    this.connection = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA
    });
  }

  query(query = '', callbackFunction) {
    this.connection.query(query, callbackFunction);
  }
}

module.exports = ClabeDb;