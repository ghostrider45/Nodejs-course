var fs = require("fs");


console.log("before file creation");
//with fs we can create just files not directries
//                   fs.writeFileSync("temp.txt","Welcome to your journey with nodejs","utf-8");
                         //console.log("File created");

//TO make Directory
//fs.mkdirSync("temp");
                            //console.log("Folder Created");

//To check folder exists or not
                      //console.log(fs.existsSync("temp") );


if(fs.existsSync("temp")){
    fs.writeFileSync("temp/temp1.txt","Welcome to your journey with nodejs","utf-8");
}
else{
    fs.mkdirSync("temp");
    fs.writeFileSync("temp/temp.txt","Welcome to your journey with nodejs","utf-8");
}
fs.appendFileSync("temp/temp1.txt","\nThere is no turning back","utf-8");