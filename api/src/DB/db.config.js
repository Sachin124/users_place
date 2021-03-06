/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */
//for database connection
var mysql = require("mysql");
const PORT = require('../../server').PORT;

var enviroment_development = {
  Dbconnection: mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'users',
    acquireTimeout: 1000000
  }),
  port: PORT
};
enviroment_development.Dbconnection.getConnection(function(err, connection) {
  if (!err){
    console.log("Connected!");
  }else{
    console.log(err);
    enviroment_development.Dbconnection.release();
  }
});

  module.exports = enviroment_development;
