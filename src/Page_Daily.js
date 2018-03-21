import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardFylke from './DashboardFylke.js';
import renderIf from 'render-if';
import FullWidthSelection from './FullWidthSelection.js';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { toJS } from 'mobx';

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
      Denne grafen viser antall konsultasjoner per dag for angitt sykdom/syndrom, sted, tid og aldersgruppe.
      </p>

      <p>
      Sykdom/syndrom, aldersgruppe og sted velges ved å klikke på rullegardinmenyene øverst. I denne grafen er det kun mulig å velge fylke og ikke kommune. I tidslinje nederst kan man skyve på rundingene i endene for å zoome inn på ønsket tidsperiode.
      </p>

      <p>
      X-aksen viser dag/uke/år, y-aksen viser antallet konsultasjoner. Den svarte streken viser antallet faktiske konsultasjoner.
      </p>

      <p>
      Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område.
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
      Antallet konsultasjoner er lavere i ferier og på helligdager. Dette er spesielt tydelig rundt jul/nyttår og påske, men også i sommerferieukene. Antallet konsultasjoner er ofte høyest på mandager, deretter synker antallet konsultasjoner i løpet av uka, og er lavest i helgene.
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
      {renderIf(this.props.store.baseURL!=="null")(
        <DashboardFylke
        info={<Info/>}
        type={"Lines"}
        getData={this.props.store.baseURL+"v1_0_DataDailyLine"}
        namesFylke={toJS(this.props.store.namesFylke)}
        namesType={toJS(this.props.store.namesType)}
        namesAge={this.props.store.namesAge}
        defaultSelectedType={this.props.store.weekSelectedType}
        defaultSelectedAge={this.props.store.weekSelectedAge}
        defaultSelectedName={this.props.store.weekSelectedFylke}
        />)}
      </FullWidthSelection>

    );
  }
})))

export default App

