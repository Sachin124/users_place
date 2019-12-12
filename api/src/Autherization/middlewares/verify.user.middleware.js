/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const env = require('../../DB/DB.config');
const connection = env.Dbconnection;
const md5 = require('md5');
exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.mobile_no) {
            errors.push('Missing mobile_no field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({
                errors: errors.join(',')
            });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({
            errors: 'Missing mobile_no and password fields'
        });
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    let query = `SELECT * FROM account_master WHERE mobile_no="${req.body.mobile_no}" AND password="${md5(req.body.password)}" AND is_deleted=0`;

    connection.query(query, (err, rows) => {
        if (!err) {
            if (!rows[0]) {
                return res.status(400).send({
                    status: false,
                    message: 'Invalid mobile_no or password'
                });
            } else {
                if (rows[0].status == 1) {
                    let dbPassword = rows[0].password;
                    let userInput = md5(req.body.password);
                    if (userInput === dbPassword) {
                        req.body = {
                            userId: rows[0].user_id,
                            email_id: rows[0].email_id,
                            full_name: rows[0].full_name,
                            mobile_no: rows[0].mobile_no
                        };
                        return next();
                    } else {
                        return res.status(400).send({
                            status: false,
                            message: 'Invalid mobile_no or password'
                        });
                    }
                } else {
                    return res.status(400).send({
                        errors: `Account is not activated`
                    });
                }
            }
        } else {
            res.status(500).send({
                status: false,
                status_code: 500,
                error: err
            });
        }


    });
};
