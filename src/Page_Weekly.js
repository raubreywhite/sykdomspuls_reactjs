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
import FontIcon from 'material-ui/FontIcon';

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
      <p>
Denne grafen viser antall konsultasjoner per uke for angitt sykdom/syndrom, sted, tid og aldersgruppe. En uke går fra mandag til søndag.
  </p>
  
      <p>
  Sykdom/syndrom, aldersgruppe og sted velges ved å klikke på rullegardinmenyene øverst. I tidslinje nederst kan man skyve på rundingene i endene for å zoome inn på ønsket tidsperiode.
      </p>
      
      <p>
      X-aksen viser uke/år, y-aksen viser antallet konsultasjoner. Den svarte streken viser antallet faktiske konsultasjoner.
      </p>
      
      <p>
      Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område (for årene 2006-2010 er 5 fremtidige år brukt).
      </p>
      
      <p>
      Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart.
      </p>
      
      <p>
      Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult.
      </p>
      
      <p>
      Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.
      </p>
      
      <p>
      Antallet konsultasjoner er lavere i ferier og på helligdager. Dette er spesielt tydelig rundt jul/nyttår og påske, men også i sommerferieukene.
      </p>
      
      <p>
      Kommunereformen: Kommuner som har blitt slått sammen og fått et nytt navn vil ikke finnes i oversiktene. Kommuner som har blitt slått sammen med en annen kommune men beholdt navnet vil vises i oversiktene, og beregningene tar hensyn til sammenslåingen. Det samme gjelder sammenslåtte kommuner som får nytt kommunenavn.
      </p>

      <p>
Små kommuner: Kommuner med under 500 innbyggere vil ikke kunne se grafer for aldersgrupperinger, men bare «totalt antall». Dette er av hensyn til personvern.
      </p>
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
{renderIf(this.props.store.baseURL!="null")(
<DashboardKommune info={<Info/>} type={"Lines"} getData={this.props.store.baseURL+"v1_0_DataWeeklyLine"} getNamesFylke={this.props.store.baseURL+"namesFylke"} getNamesKommune={this.props.store.baseURL+"namesKommune"}/>)}
</FullWidthSelection>

    );
  }
})))

export default App


//export default App;

