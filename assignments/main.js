const events = require('events');
const { onConnect } = require('./handler');

const eventEmitter = new events.EventEmitter(); 
eventEmitter.on('connect', onConnect);
eventEmitter.emit('connect');