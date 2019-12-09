/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const jwtSecret = require('../../Common/Config/env.config').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('node-uuid');
const md5 = require('md5');
const env = require('../../DB/DB.config');
const connection = env.Dbconnection;

// const connection = require('../../config/database.config').Dbconnection;
// const sendmail = require("../../config/sendmail");
const randtoken = require('rand-token');
// var refreshId;
exports.login = (req, res) => {
    try {

        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;

        var token;
        if (req.body.forToken) {
            token = `Bearer ${jwt.sign(req.body.forToken, jwtSecret)}`;
        } else {
            token = `Bearer ${jwt.sign(req.body, jwtSecret)}`;
        }

        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');

        if (req.body.user_data) {
            req.body.userId = req.body.user_data.id;
        }

       res.status(200).json({
            "status": true,
            "user_data": req.body,
            "token": token,
            "message": "Login Successful",
            "status_code": 200
        });

    } catch (err) {
        res.status(500).send({
            errors: err
        });
    }
};


exports.logout = (req,res)=>{

   var token = `Bearer ${jwt.sign('Logout', 'jwtSecret')}`;
   res.status(200).send({message: 'Logout succesfully', status_code:200, status:true, token:token});

};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({
            id: token
        });
    } catch (err) {
        res.status(500).send({
            errors: err
        });
    }
};


exports.forgotPassword = (req, res) => {

    let serachQuery = `SELECT id FROM user_master_ut WHERE email_id = '${req.body.email}'`;

    connection.query(serachQuery, (err, result) => {

        if (!result[0]) {
            return res.status(400).send({
                errors: 'Invalid e-mail'
            });
        } else {
            if (result[0].id) {
                let token = randtoken.generate(11);
                let mailto = req.body.email;
                let subject = "Courier Hub Reset Password.";
                let link;
                // if (req.body.role_id == 1) {
                link = env.mailURL + "forgotpassword/" + token;
                // } else {http://localhost:4200/admin/forgotpassword
                // link = env.mailURL1 + "changepassword/" + token;
                // }
                let mailmattter = link;
                sendmail.sendmail(mailto, mailmattter, subject);
                res.status(200).send({
                    message: `Email sent on: ${req.body.email}`
                });
            }
        }
    });
};


exports.changePassword = (req, res) => {
    if (req.jwt.password == md5(req.body.old_password)) {
            if (req.body.password !== req.body.confirm_password) {
                res.status(400).send({status:false, message:'New password and confirm passord not match!'});
            } else {
                //  const userId = req.jwt.userId;

                let updatePassword = `UPDATE mn_user SET password = '${md5(req.body.password)}' WHERE mn_user.user_id = ${req.jwt.userId}`;

                connection.query(updatePassword, (err, result) => {
                    if (result) {
                        res.status(200).send({
                            status:1,
                            message: 'Password successfully changed'
                        });
                    } else {
                        res.status(400).send({
                            message: err
                        });
                    }
                });
            }
    } else {
        res.status(400).send({
            message: 'old password was incorrect'
        });
    }

};
