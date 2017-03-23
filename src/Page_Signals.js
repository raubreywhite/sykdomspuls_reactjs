import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardWeek from './DashboardWeek.js';
import renderIf from 'render-if';

class App extends Component {

  render(){
    return(
<div>
{renderIf(this.props.baseURL!="null")(
  <DashboardWeek getData={this.props.baseURL+"v1_0_DataWeeklySignal"} getNamesWeek={this.props.baseURL+"v1_0_WeeksWeeklySignal"}/>)}
</div>
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

