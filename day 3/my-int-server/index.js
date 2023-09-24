var http = require("node:http");
var fs = require("node:fs");
const { url } = require("node:inspector");
var server = http.createServer(function(request,response){

    var fileurl = request.url.replace("/","");
    //console.log(request.url)

    var message = "Hello From HTTP Server!!!!"
    response.writeHead(200,{"content-type":"text/html"});
 /*   // response.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body><h1>Hello from nodemon server</h1></body></html>');
   response.write(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <h1>${message}</h1>
        <h1>${message.length}</h1>
        <h1>${(message.length)*2}</h1>
        <h1>${(message).toUpperCase()}</h1>
        <h1>Hello from Http server</h1>
      </body>
    </html>
    `
   ) */

   response.write(fs.readFileSync(fileurl,"utf-8"));
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