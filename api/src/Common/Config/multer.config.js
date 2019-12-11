/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

const multer = require('multer');
var date = new Date();

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __basedir + '/assets/places/');
	},
	filename: (req, file, cb) => {
		cb(null, date.getTime() + file.originalname);
	}
});

var upload = multer({
	storage: storage
});

module.exports = upload;
