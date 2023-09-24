var http = require("http");
var fs = require("fs");

var server = http.createServer(function(request, response) {
  console.log(request.url);

  if (request.url == "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end();
  } 
  else if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(fs.readFileSync("./index.html", "utf-8"));
    response.end();
  } 
  else {
    // Read the contents of the requested file
    fs.readFile("." + request.url, function(error, data) {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(fs.readFileSync("./notfound.html", "utf-8"));
        response.end();
      } else {
        // Send the content of the requested file
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  }
});

server.listen(1010, "localhost", function(error) {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Web server is now live on localhost:1010");
  }
});
