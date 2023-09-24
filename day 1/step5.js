var path = require("path");
var profiles =["Guest" , "User", "admin"];
var files =["info.html","history.html","new.html","welcome.html"];
//task is to generate random user and random file and create a path

//console.log( Math.round(Math.random() * (profiles.length-1)));

var url =path.join(profiles[Math.round(Math.random() * (profiles.length-1))],files[Math.round(Math.random() * (files.length-1))]);
console.log(url);