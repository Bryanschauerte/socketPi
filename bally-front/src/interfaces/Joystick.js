import React, { Component } from "react";
import "./Joystick.css";
import { subscribeToThing, emitToSocket } from "../api/socketConnections";
import CircleDrag from "../circleDrag/CircleDrag";


class Joystick extends Component {
  constructor(props) {
    super(props);
    subscribeToThing("joystick", (err, data) =>
      this.setState({
        data
      })
    );
  }


  handleCircleDrag = info => {
    emitToSocket("circle-drag", info);
    console.log(info, "info");
  };

  render() {

    return (
      <div className="Joystick">
        <div className="dragContainer">
          <CircleDrag dragCallBack={this.handleCircleDrag} />
        </div>

       
      </div>
    );
  }
}

export default Joystick;
