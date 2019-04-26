// const Gpio = require('pigpio').Gpio;

function dutyCycleThatPin(
  value,
  setOutputPin = {
    pwmWrite:(x)=>console.log(`pwmwrite of ${x}`)
  }
  ){
  const valueToUse = value
  if (valueToUse >= 255){
    valueToUse = 255
  }
  setOutputPin.pwmWrite(dutyCycle);
};
module.exports = { dutyCycleThatPin};
