import React, { Component } from 'react';
import {connect} from 'react-redux';
import DashboardFylke from './DashboardFylke.js';
import renderIf from 'render-if';

class App extends Component {
  render(){
    return(
<div>
      {renderIf(this.props.baseURL!="null")(
        <DashboardFylke type={"Lines"} getData={this.props.baseURL+"v1_0_DataDailyLine"} getNamesFylke={this.props.baseURL+"namesFylke"}/>
      )}
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

