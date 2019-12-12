/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const jwtSecret = require('../../Common/Config/env.config').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
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



