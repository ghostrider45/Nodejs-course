var express = require('express');
var mongoose = require('mongoose');
//----------------------------------
//module configuration
var app = express();

//----------------------------------
//middleware configuration
app.use(express.json());

//----------------------------------
//db configuration
var Schema = mongoose.Schema;
var ObjectId =Schema.ObjectId;
var url ="mongodb+srv://admin:admin12345@cluster0.bq2j8c9.mongodb.net/onlinedb?retryWrites=true&w=majority";

var hero =mongoose.model("Hero",Schema({
    id : ObjectId,
    title : String,
    firstname:String,
    lastname:String
}))

mongoose.connect(url).
then(res =>console.log("DB Connected")).
catch(res =>console.log("Error occured"));
//----------------------------------
//routes
app.get("/",function(req,res){
    hero.find().then(dbres =>{
        res.render("home.pug",{
        herolist : dbres})
    })
    .catch(error =>console.log("Error",error));
})
//----------------------------------
// WEb server Configuration
app.listen(5050,"localhost",function(error){
    if(error){console.log("Error",error)}
    else{console.log("SErver is running on port 5050");
}
})