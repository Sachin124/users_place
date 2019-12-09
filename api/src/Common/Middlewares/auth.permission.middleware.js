/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config')['jwt_secret'];

const ADMIN_PERMISSION = 1;
const OFFICEUSER_PERMISSION = 2;
const DRIVER_PERMISSION = 3;
const SENDER_PERMISSION = 4;


exports.minimumrole_idRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.role_id);
        let userId = req.jwt.userId;

        if (user_permission_level & required_permission_level) {
            return next();
        } else {

            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.role_id);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }
};


exports.onlyAdminOrOfficeUsersCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.role_id);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION || user_permission_level & OFFICEUSER_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }
};


exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};



exports.onlySenderCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.role_id);

    if (user_permission_level & SENDER_PERMISSION) {
        return next();
    } else {
        return res.status(403).send({
            message: `You don't have access!`
        });
    }

};



exports.anyUserCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.role_id);

    if (user_permission_level == SENDER_PERMISSION || ADMIN_PERMISSION || OFFICEUSER_PERMISSION || DRIVER_PERMISSION) {
        return next();
    } else {
        return res.status(403).send({
            message: 'You don not have access!'
        });
    }

};