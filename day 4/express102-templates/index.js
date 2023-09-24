var express = require("express");
var config = require("./config.json");
var app = express();

app.set("view engine","pug")
app.get("/",function(req,res){
    res.render("home");
})
app.listen(config.port,config.host,function(error)
{
    if(error){console.log(error)}
    else{console.log(`web server is hosted on ${config.host}:${config.port}`);}
})