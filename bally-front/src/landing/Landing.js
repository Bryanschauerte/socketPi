// import React, { Component } from "react";
// import Websocket from "react-websocket";

// class Landing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 90
//     };
//   }
//   componentDidMount(){}
//   handleData(data) {
//     let result = JSON.parse(data);
//     console.log(data, 'data')
    
//     // this.setState({ count: this.state.count + result.movement });
//   }

//   render() {
//     return (
//       <div>
//         Count: <strong>{this.state.count}</strong>

//         <Websocket url='ws://localhost:4000/'
//           onMessage={this.handleData.bind(this)} />
//       </div>
//     );
//   }
// }
// export default Landing