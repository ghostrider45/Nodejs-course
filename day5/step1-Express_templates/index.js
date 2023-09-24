var express = require("express");
var app = express();
//-----------------------------
//-----------------------------
app.set("view engine","pug");

//---------------
app.get("/", function(req, res) {
    res.render("home", {
      companyname: "Intellipaat",
      subject: "Node Training"
    });
  });

  app.get("/about", function(req, res) {
    res.render("about", {
      companyname: "Intellipaat",
      subject: "Node Training",
      message:"hiii how are you guys i hope u all are enjoying have a great day"
    });
  });

  
  app.get("/contact", function(req, res) {
    res.render("contact", {
      companyname: "Intellipaat",
      subject: "Node Training",
      message:"8:00 PM"
    });
  });

app.listen(process.env.PORT ||5050, "localhost",function(error)
{
    if(error){console.log("Error occured",error)}
    else {console.log("server is now running on localhost:",process.env.PORT)}
})