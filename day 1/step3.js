var os = require("os");
//console.log(os.cpus());
//console.log(os.cpus()[0]);
//console.log(os.userInfo().username);
//console.log(((os.freemem()/1024)/1024)/1024);
console.log(((os.totalmem()/1024)/1024)/1024);