import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DashboardOverviewKommune from './DashboardOverviewKommune.js';
import renderIf from 'render-if';
import FullWidthSelection from './FullWidthSelection.js';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {styles} from './Styles'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

var sprintf = require("sprintf-js").sprintf

class Info extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
      <IconButton onTouchTap={this.handleOpen} >
      <ActionInfo/>
      </IconButton>
        <Dialog
          title="Info"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
Grafen viser antall konsultasjoner per uke med en indikasjon om antallet er som forventet eller ikke. Valg av sykdom/symptom, sted og tidsrom gjøres på venstre side. Den svarte streken med rundingene viser antallet faktiske konsultasjoner. Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område. Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart. Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult. Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.
        </Dialog>
      </div>
    );
  }
}

var App = inject("store")(observer(React.createClass({
  getInitialState:function(){
  console.log("HI DATA")
    return {
    data : null
  }},
  componentDidMount:function(){
  console.log("LOADING DATA")
    this.GetData()
  },
  SetSelectedName(val){
    console.log(val)
    this.props.store.kommuneSelectedName = val
    this.GetData()
  },
  GetData(){
    console.log(this.props.store.kommuneSelectedName)
    this.setState({ data: null })
    var request = new Request(sprintf(this.props.store.baseURL+'v1_0_DataWeeklyOverviewKommune?name=%s', this.props.store.kommuneSelectedName), {
      method: 'GET', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    // Now use it!
    fetch(request)
      .then((responseText) => responseText.json())
      .then((response) => this.setState({
        data: JSON.parse(response)
      }, function(){
        console.log(this.state.data)
      }));
    
    
  },


  render(){
  
  console.log(this.props.store.baseURL)
    return(
<FullWidthSelection>

{renderIf(this.props.store.baseURL!="null")(
<DashboardOverviewKommune
  info={<Info/>}
  SetSelectedName={this.SetSelectedName}
  GetData={this.GetData}
  selectedName = {this.props.store.kommuneSelectedName}
  data = {this.state.data}
  getNamesKommune={this.props.store.baseURL+"namesKommune?name=All"}
  getData={this.props.store.baseURL+"v1_0_DataWeeklyOverviewKommune"}/>)}
</FullWidthSelection>

    );
  }
})))

export default App


//export default App;
