import React, { Component } from "react";
import Draggable from "react-draggable";
import "./circleDrag.css";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { debounce, tap, map } from "rxjs/operators";

class CircleDrag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0
    };
    this.ballInput = null;

    this.setBallRef = element => {
      this.ballInput = element;
    };
    // this.ball = React.createRef();
    this.onDrag$ = new BehaviorSubject();
    this.subscription = this.onDrag$
      .pipe(
        debounce(() => timer(300)),
        map(x => {
          if(this.props.dragCallBack){
            return this.props.dragCallBack(x)
          }
          console.log(x, 'changes and no CB')
          return x
        })
      )

      .subscribe(debounced => console.log(debounced, "yyyy"));
  }

  componentDidMount() {
    this.setState({ start: this.ballInput.getBoundingClientRect() });

  }

  handleDrag = e => {
    const rePosition = this.ballInput.getBoundingClientRect();
    const currentPosition = {
      x: rePosition.x,
      y: rePosition.y
    };
    const pastPosition = {
      x: this.state.start.x,
      y: this.state.start.y
    };
    // inverting to have top right be positive
    const movement = {
      x: Math.round(currentPosition.x - pastPosition.x),
      y: Math.round(pastPosition.y - currentPosition.y)
    };

    this.onDrag$.next(movement);
  };

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleStart = e => {
    this.setState({ start: this.ballInput.getBoundingClientRect() });

  };


  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: 0, y: 0 }}
        grid={[10, 10]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}

      >
        <div className="container">
          <div className="handle" ref={this.setBallRef} />
        </div>
      </Draggable>
    );
  }
}

export default CircleDrag;
