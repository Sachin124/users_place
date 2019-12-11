/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const express = require("express"),
  path = require("path");

const bodyParser = require("body-parser");

const app = express();
/****************************************************Routing Import Start************************************************************/

const AuthorizationRouter = require("./src/Autherization/auth.routing");

const MANAGEUSER = require("./src/app.routing");


/****************************************************Routing Import End************************************************************/

const compression = require('compression');

const cors = require("cors");


const expressValidator = require("express-validator");

const helmet = require('helmet');

const cookieSession = require('cookie-session');

const PORT = 5000;

app.use(cookieSession({
  name: 'session',
  keys: ['sessions'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(compression());

app.use(expressValidator());

app.use(helmet());

global.__basedir = __dirname;

app.use(cors());



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
console.log(__dirname);

app.use(express.static(__dirname + "/assets/places/"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/****************************************************Routing Start************************************************************/

/*************************************************
 * Authentication Routing
 *
 */

AuthorizationRouter.routesConfig(app);

/*************************************************
 *  Manage MANAGEUSER Master Routing
 *
 */
MANAGEUSER.routesConfig(app);


/****************************************************Routing End************************************************************/


// app.use("/", express.static(path.join(__dirname, "/Angular/dist")));
// app.use(express.static(path.join(__dirname, "/Angular/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/Angular/dist/index.html"));
// });

module.exports ={
  PORT
};
