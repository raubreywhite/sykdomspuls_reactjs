import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DashboardKommune from './DashboardKommune.js';
import renderIf from 'render-if';
import FullWidthSelection from './FullWidthSelection.js';

var App = inject("store")(observer(React.createClass({

  render(){
  console.log(this.props.store.baseURL)
    return(
<FullWidthSelection>
{renderIf(this.props.store.baseURL!="null")(
<DashboardKommune type={"Lines"} getData={this.props.store.baseURL+"v1_0_DataWeeklyLine"} getNamesFylke={this.props.store.baseURL+"namesFylke"} getNamesKommune={this.props.store.baseURL+"namesKommune"}/>)}
</FullWidthSelection>
    );
  }
})))

export default App


//export default App;

