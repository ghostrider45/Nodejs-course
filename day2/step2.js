var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

//ee.emit("myevent");

//here first event is emitted then listened so addlistner must be before emitting

function firstevent(){
        console.log("first","myevent happened");
}
function secondevent(){
    console.log("second","myevent happened");
}
//ee.addListener("myevent",firstevent);
//ee.on("myevent",firstevent);

// for running once 
ee.once("myevent",firstevent);

//ee.addListener("myevent",secondevent);
ee.on("myevent",secondevent);


console.log(ee.listenerCount("myevent"));


//ee.removeListener("myevent",secondevent);
ee.off("myevent",secondevent);

ee.emit("myevent");
ee.emit("myevent");
ee.emit("myevent");
ee.emit("myevent");
ee.emit("myevent");
