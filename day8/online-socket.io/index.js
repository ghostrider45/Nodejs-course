var express = require("express");
var app = express();
var http = require("http").createServer(app)
var io = require("socket.io")(http);

app.use(express.static(__dirname))
   .use(express.static(__dirname+"/public"));

io.on("connection", function(socket){
    // console.log("a client has connected");
    // socket.emit("loginevent", "hello from socket.io");
    socket.on("clientevent", function(msg){
        // console.log("client's message is ", msg);
        // socket.emit("messageevent", msg.toString().split("").reverse().join(""));
        // socket.emit("messageevent", msg.toString());
        /* 
        setInterval(function(){
            socket.emit("messageevent", msg.toString()+' '+Math.random());
        }, 2000) 
        */
        socket.emit("messageevent", msg.toString()+' '+Math.random());
    });
})
io.on("disconnect", function(socket){
    console.log("a client was disconnected");
})

http.listen(2020,"localhost", function(error){
    if(error){ console.log("Error ", err)}
    else{ console.log("Server is now live on localhost:2020")};
})