/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const API = '/api/';
exports.routesConfig = function (app) {

    app.post(`${API + 'auth-login'}`, [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
};
