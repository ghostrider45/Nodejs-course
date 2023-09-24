var fs = require("node:fs");

/* ASynchoronous 

fs.writeFile("temp/temp.txt","Welcome to your life",function(error){
    if(error)
    {
        console.log("Ganesh error",error)
    }
    else{
        console.log("File is created");
    }
})
*/
//------------------------------------------

function writemyfile(message){
    fs.writeFile("temp/temp.txt",message,function(error){
        if(error)
        {
            console.log("Ganesh error",error)
        }
        else{
            console.log("File is created");
        }
    })
}
fs.access("temp",function(error){
    if(error){
        fs.mkdir("temp",function(error){
if(error){
    console.log("Error",error);
}
else{
   writemyfile("Folder and file were created");
}
        })
    }
    else{
writemyfile("file was created");
    }
})