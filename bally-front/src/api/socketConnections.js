import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");


function subscribeToThing(thing, cb){
  console.log(`subscription to ${thing} ready`)
  socket.on(thing, connectionData => {
    console.log(`subscription to ${thing} gave ${connectionData}`)
    return cb(null, connectionData)
  });
}

function emitToSocket(channel, data) {
  console.log(`client sending ${data} on ${channel}`)
  socket.emit(channel, data);
}
export { emitToSocket, subscribeToThing };
