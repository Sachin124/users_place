/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const jwt = require("jsonwebtoken"),
  secret = require("../Config/env.config.js").jwt_secret;


exports.validJWTNeeded = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let authorization = req.headers.authorization.split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send({status:false, status_code:403, message:'Please login again!'});
    }
  } else {
    return res.status(401).send();
  }
};
