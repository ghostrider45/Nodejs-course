var fs = require("node:fs");
//console.log(fs.readFileSync("temp/temp.txt","utf-8"));

fs.readFile("temp/temp.txt","utf-8",function(error,data){
if(error)
{
    console.log("Error detected",error)
}
else{
    console.log(data);
}
});