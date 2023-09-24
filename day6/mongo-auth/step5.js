var express = require('express');
var mongoose =require('mongoose');
var sessions = require('client-sessions');
var bcrypt =require('bcrypt');
let app = express();
//-------------------------------------
 app.use(express.urlencoded({extended:true}));
 app.use(sessions({
    cookieName: 'intellipaat', // cookie name dictates the key name added to the request object
    secret: 'nfgkfgfnfvjvgvlrsvfvfbg12scc4ddfbvgbgbgscnslkfglsnvamlvfvfbgnvvjfsvlkvfsc', // should be a large unguessable string
    duration: 30 * 60* 1000, // how long the session will stay valid in ms
    activeDuration: 5 *60*1000,
    cookie: {
      ephemeral: false, // when true, cookie expires when the browser closes
        }
  }));
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
          var passwordMatch = bcrypt.compareSync(req.body.password, dbres.password);
          if (passwordMatch) {
            req.intellipaat.user = dbres;
            res.redirect("/profile");
          } else {
            res.render("login.pug", {
              error: "Invalid email or password"
            });
          }
        }
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
    var hash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5))
    var newUser = new UserModel({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email,
       password: hash
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
   if(req.intellipaat && req.intellipaat.user){
    UserModel.findOne({email: req.intellipaat.user.email})
.then(function(dbres){
    res.render("profile.pug",{
        userDetails : dbres
    })
})
.catch(function(err){
    req.intellipaat.reset();
    res.redirect("/login")
})
   }
   else{
    res.redirect("/login");
   }
})
app.get("/logout", function(req, res) {
    req.intellipaat.reset(); // Clear session
    res.redirect("/login"); // Redirect to the login page
  });
app.listen(2525,"localhost",function(error){
    if(error){console.log("Error:",error)}
    else{ console.log("server is running on 2525")
    }
})