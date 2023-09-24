//console.log(process.argv);
var profiles =["Guest" , "User", "admin"];
//console.log(profiles[process.argv[2]]+ ".html");
var param = process.argv[2];
console.log("You requested for",(param<profiles.length ? profiles[param]: profiles[0]) +".html")