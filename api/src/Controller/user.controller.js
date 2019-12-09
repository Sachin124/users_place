/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

var q = require('q');
const UMODEL = require('../Model/user.model');

let userController = {

  addUser: (req, res) => {
    req.checkBody("email_id", "email_id is required").notEmpty();
    req.checkBody("mobile_no", "mobile_no is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();
    req.checkBody("full_name", "full_name is required").notEmpty();
    var errors = req.validationErrors();
    if (errors === false) {
      UMODEL.addUser(req).then(rows => {
        response = {
          "status": 1,
          "message": 'User Added Successfully!'
        };
        res.json(response);
      }).catch(error => {
        response = {
          "status": 0,
          "message": error.message
        };
        res.json(response);
      });
    } else {
      res.status(400).send({
        status: false,
        err: errors
      });
    }
  },

  get: (req, res) => {

    UMODEL.get(req).then(rows => {
      response = {
        "status": 1,
        "data": rows
      };
      res.json(response);
    }).catch(error => {
      response = {
        "status": 0,
        "message": error.message
      };
      res.json(response);
    });
  },

  update: (req, res) => {

    UMODEL.update(req).then(rows => {
      // console.log(rows);

      response = {
        "status": 1,
        "message": 'Commission rate updated'
      };
      res.json(response);
    }).catch(error => {
      response = {
        "status": 0,
        "message": error.message
      };
      res.json(response);
    });
  }

};


module.exports = userController;
