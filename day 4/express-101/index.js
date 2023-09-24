var express = require("express");
var app = express();

//----------------------------------------
//app.use(express.static(__dirname + "/public",{ index :"app.html"}));
//-----------------------------------------

//Default Route
app.get("/",function(req,res){
    /* 
   res.write("Hello From Express");
   res.end();
*/
//res.send("<h1>Hello from express</h1>");
res.sendFile(__dirname + "/public/app.html");
}) 

//Wildcard route
app.get("**",function(req,res){

    res.sendFile(__dirname + "/public/"+req.url);
    }) ;

    //Named Routes
/* 
 app.get("/product.html",function(req,res){

        res.sendFile(__dirname + "/public/product.html");
        }) ;
        
app.get("/contact.html",function(req,res){

    res.sendFile(__dirname + "/public/contact.html");
    }) 
    

 */ 

app.listen(3030,function(error){
    if(error){ console.log("Error",error); }
    else{
console.log("Web server is running on port 3030"); }
 });