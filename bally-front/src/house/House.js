
import React, { Component } from "react";
import "./House.css";
import ToggleSwitch from '../interfaces/ToggleSwitch'
import { subscribeToThing } from "../api/socketConnections";

class House extends Component {
  constructor(props) {
    super(props)
    subscribeToThing("sprinkler status", (err, statis) =>
      console.log(statis, 'statis')
    );

  }

  render() {
    const statuses = {
      
    }
    return (
      <div className="House-view">
        <div className="Sprinklers">

          <ToggleSwitch extraClass="back"  label={"Close Back"} />
          <ToggleSwitch extraClass="back" label={"Far Back"} />
          <ToggleSwitch extraClass="front" label={"Street Left"} />
          <ToggleSwitch extraClass="front" label={"MailBox Strip"} />
          <ToggleSwitch extraClass="front" label={"Street Right"} />
        </div>
        <div className={`Yard-container ${this.props.className}`}>
 
          <div className="House-container">
            <div className="House-section Section-one">one</div>
            <div className="House-section Section-two">two</div>
            <div className="House-section Section-three">three</div>

          </div>
        </div>
      </div>

    );
  }
}

export default House;
