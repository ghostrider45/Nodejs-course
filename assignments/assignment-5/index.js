const http = require('http');
const url=require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
const{pathname,query}=url.parse(req.url,true);
if(pathname ==='/form'){
    if(req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(`
        <html>
        <body>
        <h1>Simple form</h1>
        <form method="POST" action="/form">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name"><br><br>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email"><br><br>
        <button type="submit">Submit</button>
        </form>
        </body>
        </html>
        `);
        return res.end();
    }
    else if(req.method==='POST')
    {
let body='';
req.on('data',(chunk)=>{
body +=chunk.toString();
});
req.on('end',()=>{
    const formData = querystring.parse(body);
    res.writeHead(200,{'content-type':'text/html '});
    res.write(`
    <html>
    <body>
    <h1>Form Data</h1>
    <p> Name: ${formData.name}</p>
    <p>Email: ${formData.email}</p>
    </body>
    </html>
    `);
    return res.end();
});
    }
    }
    else if(pathname==='/querystring')
    {
        const qsData = query || {};
        res.writeHead(200,{'content-type':'text/html'});
        res.write(`
        <html>
        <body>
            <h1>querystring Data</h1>
            <p>Name: ${qsData.name}</p>
            <p>Emial: ${qsData.email}</p>
        </body>
        </html>
        `);
        return res.end();
    }
    else{
        res.writeHead(404);
        res.write('404 not found');
        return res.end();
    
}
});
const port = 5093;
server.listen(port,()=>{
    console.log("Server is running on Port:",port);
});