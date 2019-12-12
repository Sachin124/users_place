/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const connection = require('../DB/db.config').Dbconnection;
var Q = require('q');
const md5 = require('md5');

let userModel = {

  /*****************************************Add New User Account***************************************************************/

  addUser: (req, res) => {

    var deferred = Q.defer();

    let query = `INSERT INTO account_master(email_id, mobile_no, password, full_name) VALUES ('${req.body.email_id}', '${req.body.mobile_no}', '${md5(req.body.password)}','${req.body.full_name}')`;
    connection.query(query, (err, rows) => {
      if (!err) {
        deferred.resolve(rows);
      } else if (err) {
        deferred.reject(new Error(err.sqlMessage));
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Add New Place User ***************************************************************/


  addUserDetails: (req, res) => {
    var deferred = Q.defer();
    let query =`INSERT INTO user_details(full_name,created_by) VALUES ('${req.body.name}', ${req.jwt.userId})`;
    if (req.params.user_id) {
     query = `UPDATE user_details SET full_name='${req.body.name}' WHERE user_id = ${req.params.user_id}`;
    }
    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Update New Place User***************************************************************/

  updateUserDetails: (req, res) => {
    var deferred = Q.defer();
    let query = `UPDATE user_details SET full_name='${req.body.name}'`;
    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Add New User Place ***************************************************************/

  addPlaces: (req, res) => {
    var deferred = Q.defer();
    let query = `INSERT INTO user_saved_places(user_id, user_master_id, place_name, description, image_path, address) VALUES ?`;
    var userPlaces = [];
    for (let index = 0; index < req.body.placeDetails.length; index++) {
      const element = req.body.placeDetails[index];
      userPlaces[index] = [req.body.user_id, req.jwt.userId, element.place_name, element.description, element.image_path, element.address];
    }
    connection.query(query,[userPlaces], (err, rows) => {
      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Get All User Details***************************************************************/

  getUsers: (req, res) => {

    var deferred = Q.defer();

    let query = `SELECT * FROM user_details WHERE created_by= ${req.jwt.userId}  AND is_deleted = 0`;

    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Get All User Places***************************************************************/

  getUserPlaces: (req, res) => {

    var deferred = Q.defer();
    let query = `SELECT * FROM user_saved_places as place LEFT JOIN user_details as user ON place.user_id = user.user_id WHERE place.user_master_id= ${req.jwt.userId} AND place.user_id=${req.params.user_id}  AND user.is_deleted = 0`;

    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Delete User In this we are doing soft delete using is_delted flag********************************/

  deleteUser: (req, res) => {

    var deferred = Q.defer();

    let query = `UPDATE user_details user, user_saved_places place SET user.is_deleted= 1 , place.is_deleted= 1 WHERE user.user_id = place.user_id AND user.user_id = ${req.params.user_id} AND user.created_by = ${req.jwt.userId}`;
    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
    // genricResponse(query);
  },

  /*****************************************User Activate/Deactivate***************************************************************/

  updateUserStatus:(req, res) => {
    var deferred = Q.defer();

    let query = `UPDATE user_details SET status = CASE WHEN status = '1' THEN  status = '0' ELSE status='0' END WHERE user_id = ${req.params.user_id} `;
    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Delete User In this we are doing soft delete using is_delted flag********************************/

  deletePlaces:(req, res) => {
    var deferred = Q.defer();
    let query = `DELETE FROM user_saved_places WHERE user_id = ${req.params.user_id}`;
    connection.query(query, (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

  /*****************************************Update User Places***************************************************************/

  updatePlaces: (req, res) => {
    var deferred = Q.defer();
    let query = `INSERT INTO user_saved_places(user_id, user_master_id, place_name, description, image_path, address) VALUES ?`;
    var userPlaces = [];
    for (let index = 0; index < req.body.placeDetails.length; index++) {
      const element = req.body.placeDetails[index];
      userPlaces[index] = [req.params.user_id, req.jwt.userId, element.place_name, element.description, element.image_path, element.address];
    }
    connection.query(query,[userPlaces], (err, rows) => {

      if (!err) {
        deferred.resolve(rows);
      } else {
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },
};
module.exports = userModel;
