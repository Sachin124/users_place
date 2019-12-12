/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const AuthValidationMiddleware = require('./Common/Middlewares/auth.validation.middleware');
const URL = `/api/`;
const Upload = require("./Common/Config/multer.config");

const ManageUser = require('./Controller/user.controller');
exports.routesConfig = function (app) {


  /***************************************************************************************************************************************/

  /*****************************************Get All User Places***************************************************************/

  app.get(`${URL}get-all-places/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.get
  ])

  /*****************************************Update User Places***************************************************************/

  app.get(`${URL}update-user-status/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.updateUserStatus
  ])

  /*****************************************Delete User In this we are doing soft delete using is_delted flag********************************/

  app.delete(`${URL}delete-user/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.deleteUser
  ])

  /*****************************************Get All User Details***************************************************************/

  app.get(`${URL}get-users`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.getUsers
  ])

  /*****************************************Add New User Account***************************************************************/

  app.post(`${URL}add-new-user`, [
    ManageUser.addUser
  ]);

  /*****************************************Add New User Place ***************************************************************/

  app.post(`${URL}add-new-places`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.addPlaces
  ]);

  /*****************************************Upload Place Image using Multer***************************************************************/

  app.post(`${URL}add-places-image`, [
    AuthValidationMiddleware.validJWTNeeded,
    Upload.single("image"),
    ManageUser.uploadImage
  ]);

  /*****************************************Update User Places***************************************************************/


  app.patch(`${URL}update-user-places/:user_id`, [
    AuthValidationMiddleware.validJWTNeeded,
    ManageUser.updatePlaces
  ]);
  /***************************************************************************************************************************************/
};
