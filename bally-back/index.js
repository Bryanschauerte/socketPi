const express = require("express");
const app = express();
const api = require('./api/gpioHandler')
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 4000;
const Gpio = require('pigpio').Gpio;

// sprinklers

const activatedPins = {
  closeBack: 20,
  farBack: 21,
  streetLeft: 16,
  streetRight: 12,
  mailBoxStrip: 26
  // pins
}
const joyStick ={
  ena: 19,
  enb: 13,
  inOne: 5,
  inTwo: 22,
  inthree: 27,
  inFour: 17
}


server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

let sprinkerObject ={
  "Close Back": false,
  "Far Back": false,
  "Street Left": false,
  "Street Right": false,
  "MailBox Strip": false
}

// get pins ready 
const keys = Object.keys(activatedPins)
keys.map(k =>{
  activatedPins[k] = new Gpio(activatedPins[k], { mode: Gpio.OUTPUT })
  activatedPins[k].digitalWrite(0)
})

function getStatus(){
  const keys = Object.keys(activatedPins)
  const obj = {}
  keys.map(k => {
    pbj.k = activatedPins[k].digitalRead() === 0

  })
  return obj
}

// Routing
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  var addedUser = false;
  socket.emit("connected", {
    welcomeMessage: "connected messages welcome"
  });

  // SPRINKLERS START
  socket.on("get sprinkler status", newStatus => {
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

  })
  socket.on("Close Back", newStatus =>{
    const turnOff = newStatus === false;
    if(turnOff){
      return activatedPins.closeBack.digitalWrite(0)
    }
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

    return activatedPins.closeBack.digitalWrite(1)

  })
  socket.on("Far Back", newStatus => {

    const turnOff = newStatus === false;
    if (turnOff) {
      return activatedPins.farBack.digitalWrite(0)
    }
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

    return activatedPins.farBack.digitalWrite(1)

  })
  socket.on("Street Left", newStatus => {

    const turnOff = newStatus === false;
    if (turnOff) {
      return activatedPins.streetLeft.digitalWrite(0)
    }
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

    return activatedPins.streetLeft.digitalWrite(1)

  })
  socket.on("Street Right", newStatus => {

    const turnOff = newStatus === false;
    if (turnOff) {
      return activatedPins.streetRight.digitalWrite(0)
    }
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

    return activatedPins.streetRight.digitalWrite(1)

  })
  socket.on("MailBox Strip", newStatus => {

    const turnOff = newStatus === false;
    if (turnOff) {
      return activatedPins.mailBoxStrip.digitalWrite(0)
    }
    const sprinkerStatus = getStatus()
    socket.emit("sprinkler status", sprinkerStatus);

    return activatedPins.mailBoxStrip.digitalWrite(1)

  })
  // SPRINKLERS END

  socket.on("circle-drag", info => {
    // console.log(info, "ifo");
    const newInfo = info
    const xNegative = newInfo.x && newInfo.x < 0;
    const yNegative = newInfo.y && newInfo.y < 0;
    if (newInfo.x >= 220){
      newInfo.x = 220
    }
    if (newInfo.y >= 220) {
      newInfo.y = 220
    }
    const xMovment = (Math.round((Math.abs(newInfo.x) / 220) * 10) / 10).toFixed(2);
    const yMovment = (Math.round((Math.abs(newInfo.y) / 220) * 10) / 10).toFixed(2);
   
    const percentage = {
      xNegative,
      yNegative,
      x: xMovment*100,
      y: yMovment * 100
    };
    dudtyCycleThatPin()
    console.log(percentage, "PERCENTAGE");
  });
  // when the client emits 'new message', this listens and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });

  socket.on("button one", data => {
    console.log(data, "data");
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
