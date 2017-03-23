import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardKommune from './DashboardKommune.js';
import renderIf from 'render-if';

class App extends Component {

  render(){
    return(
<div>
{renderIf(this.props.baseURL!="null")(
<DashboardKommune type={"Lines"} getData={this.props.baseURL+"v1_0_DataWeeklyLine"} getNamesFylke={this.props.baseURL+"namesFylke"} getNamesKommune={this.props.baseURL+"namesKommune"}/>)}
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

