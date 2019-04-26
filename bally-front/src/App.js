import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Landing from "./landing/Landing.js";
import { emitToSocket } from "./api/socketConnections";
import CircleDrag from "./circleDrag/CircleDrag";
import Joystick from "./interfaces/Joystick";
import House from "./house/House";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="App">
        <Router>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <header className="App-header">
            <div className="App-title">Schauerte | Pi stuff </div>
            <div className="App-nav">
              <Link className="link" to="/Joystick/">
                Joystick
              </Link>
              <Link className="link" to="/house/">
                House
              </Link>
              <Link className="link" to="/">
                Home
              </Link>
            </div>
          </header>

<div className="App-body">
            <Route path="/joystick" exact component={Joystick} />
            <Route path="/house" exact component={House} />
</div>

        


          <button
            onClick={e => {
              e.preventDefault();
              emitToSocket("button one", { that: 1 });
            }}
          >
            Button one
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              emitToSocket("button one", { that: 1 });
            }}
          >
            Button two
          </button>
        </Router>
      </div>
    );
  }
}

export default App;
