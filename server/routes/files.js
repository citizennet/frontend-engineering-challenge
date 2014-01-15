'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var http = require('http');

/* Download the data.json file which contains the saved data from the server */
exports.download = function (req, res) {

	var FilePath =__dirname+ '/../data/data.json';


	var fileJSON = require(FilePath);
	if(fileJSON){
		var data = (fileJSON);
		res.send(data,200);
	}else{
		res.send(400); //File isn't written yet
	}
};

/* Keep Track of the Intevals */
var intervals = {
	main:'',
	tryAgain:''
};

var tryAgain = function(url){
	var clear = clearInterval(intervals.tryAgain);
	intervals.tryAgain = setInterval(function(){getData(url);},(3*1000));	
};

/* If sucessful, write the data to a file that will be called by the client */
var writeData = function(data){
	var FilePath =__dirname+ '/../data/data.json';

	fs.writeFile(FilePath, data, function (err) {
		if(err){
			return console.log(err);
		}else{
			var clear = clearInterval(intervals.tryAgain);
			console.log('Data Written to '+FilePath);
		}
	});

};

var getData = function(dataURL){
	
	var request = http.request(dataURL, function (res) {
	    var data = '';
	    res.on('data', function (chunk) {
		data += chunk;
	    });
	    res.on('end', function () {
		var json = JSON.parse(data);
		if(json.hasOwnProperty('error')){
			console.log("An Exception Happened (503)");
			tryAgain(dataURL);
		}else{
			writeData(data);
		}

	    });
	});
	request.on('error', function (e) {
	console.log("AN ERROR OCCURED!!");
	    console.log(e.message);
	});
	request.end();

};


/*
*	runHour is a Number, from 0 to 23, representing the hour you want the program to fetch the new data from the url
*	
*/
var runHour = 7;
var requestURL = 'http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
var run = function(){
	var thisHour = new Date().getHours();
	if (thisHour == runHour){
		getData(requestURL);
	};
};

//3600000
var main = setInterval(function(){run();},(3000));

