import React, {Component} from 'react'
import './ToggleSwitch.css'
import { emitToSocket, subscribeToThing } from "../api/socketConnections";

class ToggleSwitch extends Component {

  constructor(props){
    super(props)
    subscribeToThing(this.props.label, (err, isActive) =>
      this.setState({
        active: isActive
      })
    );
    this.state = {
      active: false
    }
    subscribeToThing("sprinkler status", (err, sprinkerObject) =>{
      
      this.setState({
        active: sprinkerObject[this.props.label]
      })});

  }

  componentDidMount(){
    emitToSocket("get sprinkler status", this.props.label);

  }

  handleSwitch = () =>{
    this.setState({ active: !this.state.active })
    emitToSocket(this.props.label, !this.state.active );
  }

  render(){
    const {extraClass} = this.props

    return (
    <div className={` ${extraClass} Toggle-switch`}>
      <label className="switch">
        <input type="checkbox" onChange={this.handleSwitch} checked={this.state.active}/>
          <span className="slider">{this.props.label}</span>
      </label>
    </div>)
  }
}

export default ToggleSwitch