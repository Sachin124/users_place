/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const VerifyUserMiddleware = require('./Autherization/middlewares/verify.user.middleware');
const AuthorizationController = require('./Autherization/controllers/authorization.controller');
const AuthValidationMiddleware = require('./Common/Middlewares/auth.validation.middleware');
const URL = `/api/`;
const Upload = require("./Common/Config/multer.config");

const ManageUser = require('./Controller/user.controller');
exports.routesConfig = function (app) {

  app.get(`${URL}get-all-places/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.get
  ])

  app.get(`${URL}update-user-status/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.updateUserStatus
  ])

  app.delete(`${URL}delete-user/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.deleteUser
  ])

  app.get(`${URL}get-users`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.getUsers
  ])

  app.post(`${URL}add-new-user`, [
    ManageUser.addUser
  ]);

  app.post(`${URL}add-new-places`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.addPlaces
  ]);

  app.post(`${URL}add-places-image`, [
    Upload.single("image"),
    ManageUser.uploadImage
  ]);

};
