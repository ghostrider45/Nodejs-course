var express = require('express');
var mongoose =require('mongoose');
let app = express();
//-------------------------------------
 app.use(express.urlencoded({extended:true}));
//-------------------------------------
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserModel = mongoose.model("user", new Schema({
    id: ObjectId,
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String
 }));
 
var url="mongodb+srv://admin:admin12345@cluster0.bq2j8c9.mongodb.net/authdb?retryWrites=true&w=majority"
mongoose.connect(url)
.then(function(res){
    console.log("Db COnnected")
})
.catch(function(err){
    console.log("ERrror",err);
})
app.get("/",function(req,res){
    res.render("home.pug")
})
app.post("/login", function(req, res) {
    UserModel.findOne({ email: req.body.email })
        .then(function(dbres) {
            if (!dbres) {
                res.render("login.pug", {
                    error: "No user found with these credentials"
                });
            } else {
                if(req.body.password ===dbres.password){
                   res.redirect("/profile")
                }
                else{

              
               res.render("login.pug",{
                error:"Invalid email or password"
               })
            }  }
        })
        .catch(function(err) {
            console.log(err);
        });
});
app.get("/login",function(req,res){
    res.render("login.pug")
})
app.get("/registor",function(req,res){
    res.render("registor.pug")
})

 app.post("/registor", function(req, res) {
    var newUser = new UserModel({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email,
       password: req.body.password
    });
 
    newUser.save()
.then(function(dbres){
res.redirect("/login");
console.log("User Created "+dbres.firstname +"Successfully")
})
.catch(function(err){
    if(err.code=11000){
        res.render("registor.pug",{
            error:"email already exist"
        })
    }
    else{
        res.render("registor.pug",{
            errormsg : "Something went wrong please try again later."
        })
    }
})
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