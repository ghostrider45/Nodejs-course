var express =require("express");
var fs=require("fs");
var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/form",function(req,res){
    res.sendFile(__dirname + "/form.html");
})

app.post("/form",function(req,res){
    console.log(req.body.name);
    console.log(req.body.email);
})
app.listen(3030,function(error){
    if(error){ console.log("Error",error); }
    else{
console.log("Web server is running on port 3030"); }
 });