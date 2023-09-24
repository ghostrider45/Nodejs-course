var fetch = require("fetch");
var fs = require("fs");

var filetoread  =process.argv[2];

var fileToWrite = process.argv[3];
if(filetoread){
    fetch.fetchUrl(filetoread, function(error,meta,body){
        if(error){
            console.log("Error",error)
        }
        else{
          
            
        var tempdata = body.toString().replace('<a class="navbar-brand logo" href="/">Arcstellar</a>','<a class="navbar-brand logo" href="/">Ganesh</a>');
        fs.writeFile(fileToWrite+".html",tempdata,"utf-8",function(error){
            if(error){
                console.log("Error",error);
            }
            else{
                console.log("File was Created");
            }
        })
        //console.log(body.toString().replace('<a class="navbar-brand logo" href="/">Arcstellar</a>','<a class="navbar-brand logo" href="/">Ganesh</a>'));
        }
    });
}