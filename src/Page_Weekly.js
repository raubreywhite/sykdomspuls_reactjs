import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DashboardKommune from './DashboardKommune.js';
import renderIf from 'render-if';
import FullWidthSelection from './FullWidthSelection.js';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {styles} from './Styles'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class DialogExampleSimple extends React.Component {
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
        <IconButton iconClassName="muidocs-icon-custom-github" onTouchTap={this.handleOpen} />
        <Dialog
          title="Info"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
Grafen viser antall konsultasjoner per uke med en indikasjon om antallet er som forventet eller ikke. Valg av sykdom/symptom, sted og tidsrom gjøres på venstre side. Den svarte streken med rundingene viser antallet faktiske konsultasjoner. Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område. Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart. Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult. Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.
        </Dialog>
      </div>
    );
  }
}

var App = inject("store")(observer(React.createClass({

  render(){
  console.log(this.props.store.baseURL)
    return(
<FullWidthSelection>
<div>
{renderIf(this.props.store.baseURL!="null")(
<DashboardKommune type={"Lines"} getData={this.props.store.baseURL+"v1_0_DataWeeklyLine"} getNamesFylke={this.props.store.baseURL+"namesFylke"} getNamesKommune={this.props.store.baseURL+"namesKommune"}/>)}
<DialogExampleSimple/>
</div>

</FullWidthSelection>

    );
  }
})))

export default App


//export default App;

