//'use strict';
var mainApp = require("./app.js");

var request = require("request");
var fs = require("fs");
var http = require("http");

const proto = 'http://';
const host1 = 'date.jsontest.com';
const port1 = 80;
const path1 = '/ip';

var cache = ""; //this is where we store data, if its there

exports.returnJSONObj = function (path, logger) {

    var getOptions = {
        hostname: host1,
        port: port1,
        //path: path1,
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength("")
        }
    };

    var req = http.request(getOptions); 
    var data = '';
    //async
    req.on('response', function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) { data = chunk; });
        res.on('end', function () {
            exports = data;
            cache = JSON.parse(data);
            if (logger)
                console.log(data);
        });
    });
    req.end();
    //end async
    // end the request
};
setInterval(function () {
    mainApp.returnJSONObj(null, false);
}, 5000);

setInterval(function () {
    if (cache) //if cache is filled->print
        console.log(cache.time);
    else
        console.log("No Data");
}, 2000);