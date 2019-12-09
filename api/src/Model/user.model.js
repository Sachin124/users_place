/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const connection = require('../DB/db.config').Dbconnection;
var Q = require('q');
const md5 = require('md5');

let userModel = {

  addUser: (req,res)=>{

    var deferred = Q.defer();

    let query = `INSERT INTO account_master(email_id, mobile_no, password, full_name) VALUES ('${req.body.email_id}', '${req.body.mobile_no}', '${md5(req.body.password)}','${req.body.full_name}')`;
    connection.query(query, (err,rows)=>{
      if (!err) {
        deferred.resolve(rows);
      }else if(err){
        deferred.reject(new Error(err.sqlMessage));
      }else{
        deferred.reject(new Error(err));
      }
    });
    return deferred.promise;
  },

    get: (req, res) => {

        var deferred = Q.defer();

        let query = `SELECT commission.commission_id, commission.service_type_id, commission.commission_rate, service.name FROM mn_commissin_master as commission LEFT JOIN mn_service_type_master as service ON commission.service_type_id = service.service_type_id  WHERE commission.is_deleted=0`;
        connection.query(query, (err, rows) => {

            if (!err) {
                deferred.resolve(rows);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    },

    update: (req,res)=>{

        var deferred = Q.defer();

        let updateQuery = `UPDATE mn_commissin_master SET commission_ratse = '${req.body.commission_rate}' WHERE mn_commissin_master.commission_id = ${req.body.commission_id}`;

        connection.query(updateQuery, (err,rows)=>{

            if (!err) {
                deferred.resolve(rows);
            }else{
                // let err = {status:false, error: err};
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    }

};

module.exports = userModel;
