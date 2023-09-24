var express = require('express');
let app = express();

app.get("/",function(req,res){
    res.render("home.pug")
})
app.post("/login",function(req,res){
    res.render("login.pug")
})
app.get("/login",function(req,res){
    res.render("login.pug")
})
app.get("/registor",function(req,res){
    res.render("registor.pug")
})
app.get("/profile",function(req,res){
    res.render("profile.pug")
})
app.get("/logout",function(req,res){
    res.redirect("/")
})
app.listen(2525,"localhost",function(error){
    if(error){console.log("Error:",error)}
    else{ console.log("server is running on 2525")
    }
})