/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const VerifyUserMiddleware = require('./Autherization/middlewares/verify.user.middleware');
const AuthorizationController = require('./Autherization/controllers/authorization.controller');
const AuthValidationMiddleware = require('./Common/Middlewares/auth.validation.middleware');
const URL = `/api/`;

const ManageUser = require('./Controller/user.controller');
exports.routesConfig = function (app) {

    app.post(`${URL}add-new-user`, [
        ManageUser.addUser
    ]);

};
