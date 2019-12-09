/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../Common/Middlewares/auth.validation.middleware');
const API = '/api/';
exports.routesConfig = function (app) {

    app.post(`${API + 'auth-login'}`, [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);

    app.post('/forgotPassword', [
        AuthorizationController.forgotPassword
    ]);

    app.post(`${API +'changepassword'}`, [
        AuthValidationMiddleware.validJWTNeeded,
        AuthorizationController.changePassword
    ]);

    app.post('/logout', [
        AuthorizationController.logout
    ]);
};
