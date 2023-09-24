var express = require("express");
var config = require("./config.json");
var data = require("./data.json");
var fs = require("fs");

var app = express();
var tempdata = data
//---------------------------------------------
//middlewares

app.use(express.urlencoded({extended:true}))
//-----------------------------------------------------
var title="Intellipaat Application"
app.get("/",function(req,res){
    res.render("home.pug",{
        title: title,
        herolist:tempdata.herolists
    })
})

app.post("/",function(req,res){
 tempdata.herolists.push(req.body.htitle);
 fs.writeFile("data.json",JSON.stringify(tempdata),function(err){
    console.log("Error occured:", err);
 res.redirect("/")
res.end();
    })
})

app.listen(config.PORT,config.host,function(err)
{
    if(err){console.log("Error Occured!!",err)}
    else{console.log("server is now live on "+config.host +":" +config.PORT)}
});