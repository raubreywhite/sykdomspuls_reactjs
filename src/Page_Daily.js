import React, { Component } from 'react';
import {connect} from 'react-redux';
import DashboardFylke from './DashboardFylke';
var Node = require('react-if-comp')

class App extends Component {

  render(){
    return(
<Node if={this.props.baseURL!="null"}>
<Node then><DashboardFylke type={"Barometer"} getData={this.props.baseURL+"v1_0_DataWeeklyOverview"} getNamesFylke={this.props.baseURL+"namesFylke"}/></Node>
</Node>
    );
  }
}

function mapStateToProps(state) {
  return {
    baseURL: state.baseURL
  }
}

export default connect(mapStateToProps)(App);

//export default App;

