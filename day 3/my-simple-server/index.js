var http = require("node:http");
var server = http.createServer(function(request,response){
    response.writeHead(200,{"content-type":"text/plain","author":"Ganesh"});
    response.write("<h1>Hii</h1>");

    response.end();
});

server.listen(1010,"localhost",function(error){
    if(error){
        console.log("Error",error)
    }
    else{
        console.log("Server is listening to you");
    }
})