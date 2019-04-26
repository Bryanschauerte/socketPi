import openSocket from "socket.io-client";
const address = `${window.location.protocol}//${window.location.hostname}:4000`
const socket = openSocket(address)


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
