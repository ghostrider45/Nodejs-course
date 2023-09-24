var EventEmitter =require("node:events").EventEmitter;

var myevent = new EventEmitter();
console.log("Event from line 5");
myevent.addListener("vijayevent",function(){
    console.log("vijay event occured","line 6") ;
});

console.log("log from line 9");

myevent.emit("vijayevent");
setTimeout(function(){
    console.log("log from line 13");
    myevent.emit("vijayevent");
}, 2000);