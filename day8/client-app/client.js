var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.listen(3000,"localhost",function(err){
    if(err){
        console.log(err);
    }
    else{
console.log("Localhost is live on port 3000");
    }
})