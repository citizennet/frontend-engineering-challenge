'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');

/* Download the data.json file which contains the saved data from the server */
exports.download = function (req, res) {


	var FilePath =__dirname+ '/../data/data.json';

	var fileJSON = require(FilePath);
	var data = (fileJSON);
	res.send(data,200);

/*
	fs.readFile(FilePath,'utf8', function (err, file) {
		if (err) throw err;

		console.log("File Read");
		res.send(JSON.parse(file),200);


	});
*/
	
};
