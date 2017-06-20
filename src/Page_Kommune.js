import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardWeek from './DashboardWeek.js';
import renderIf from 'render-if';
import {Tabs, Tab} from 'material-ui/Tabs';

class App extends Component {

  render(){
    return(
<Tabs>
<Tab label="Item one">
{renderIf(this.props.baseURL!="null")(
  <DashboardWeek getData={this.props.baseURL+"v1_0_DataWeeklySignal"} getNamesWeek={this.props.baseURL+"v1_0_WeeksWeeklySignal"}/>)}
</Tab>
<Tab label="Item two">
<p> hi </p>
</Tab>
</Tabs>
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

