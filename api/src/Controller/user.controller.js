/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

var q = require('q');
const UMODEL = require('../Model/user.model');

let userController = {

  /*****************************************Add New User Account***************************************************************/


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

  /*****************************************Get All User Details***************************************************************/

  getUsers:(req,res)=>{
    UMODEL.getUsers(req).then(rows => {
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

  /*****************************************Get All User Places***************************************************************/

  get: (req, res) => {

    UMODEL.getUserPlaces(req).then(rows => {
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

  /*****************************************Upload Place Image using Multer***************************************************************/


  uploadImage : (req, res) => {
    if (!req.file) {
        res.status(400).send({
            status: false,
            status_code: 200,
            err: 'Image file is required',
            param: "image",
        });
    }else{
      res.status(200).send({
        status: true,
        status_code: 200,
        message: "Place Image added",
        image:req.file.filename
    });
    }
  },

  /*****************************************Add New User Place ***************************************************************/

  addPlaces: (req,res)=>{
    UMODEL.addUserDetails(req).then(userDetails=>{
      req.body.user_id = userDetails.insertId;
      UMODEL.addPlaces(req).then(places=>{
        response = {
          "status": 1,
          "message": 'User Place Added!'
        };
        res.json(response);
      }).catch(error => {
        response = {
          "status": 0,
          "message": error.message
        };
        res.json(response);
      });
    })
  },

  /*****************************************Update User Places***************************************************************/

  updatePlaces: (req,res)=>{
    UMODEL.addUserDetails(req).then(userDetails=>{
      UMODEL.deletePlaces(req).then(deleteDetails=>{
      UMODEL.updatePlaces(req).then(places=>{
        response = {
          "status": 1,
          "message": 'User Place updated!'
        };
        res.json(response);
      }).catch(error => {
        response = {
          "status": 0,
          "message": error.message
        };
        res.json(response);
      });
    });
    });
  },

  /*****************************************Delete User In this we are doing soft delete using is_delted flag********************************/

  deleteUser: (req, res) => {

    UMODEL.deleteUser(req).then(rows => {
      response = {
        "status": 1,
        "message": 'User Deleted'
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

  /*****************************************User Activate/Deactivate***************************************************************/


  updateUserStatus: (req, res) => {

    UMODEL.updateUserStatus(req).then(rows => {
      response = {
        "status": 1,
        "message": 'User status changed'
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
