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
import URLSearchParams from 'query-string';

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
      <p>
      Dette diagrammet viser de siste 8 ukene i en valgt kommune. En uke går fra mandag til søndag.
      </p>

      <p>
      Velg ønsket kommune på streken oppe til venstre, enten ved å skrive kommunenavnet eller nummeret så kommer det opp en liste som du kan velge fra.
      </p>

      <p>
      X-aksen viser uke og år, y-aksen viser hvilken sykdom/symptom og alder.
      </p>

      <p>
      Grønne felt betyr at antall konsultasjoner ikke er høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Gule felt betyr at antall konsultasjoner er høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Røde felt betyr at antall konsultasjoner er betydelig høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Fargene er laget ut fra beregninger fra de foregående 5 årene i fylket eller kommunen.
      </p>

      <p>
      Kommunereformen: Kommuner som har blitt slått sammen og fått et nytt navn vil ikke finnes i oversiktene. Kommuner som har blitt slått sammen med en annen kommune men beholdt navnet vil vises i oversiktene, og beregningene tar hensyn til sammenslåingen. Det samme gjelder sammenslåtte kommuner som får nytt kommunenavn.
      </p>

      <p>
      Små kommuner: Kommuner med under 500 innbyggere vil ikke kunne se grafer for aldersgrupperinger, men bare «totalt antall». Dette er av hensyn til personvern.
      </p>

      <p>
      65p: 65p betyr at alle over 65 år er med i denne aldersgruppen
      </p>
      </Dialog>
      </div>
    );
  }
}

var App = inject("store")(observer(React.createClass({
  getInitialState:function(){
    console.log("HI DATA")
    return {
      namesKommune: [{location: "municip0301", locationName: "Oslo [0301]"}],
      data : null
    }},
  componentDidMount:function(){
    console.log("LOADING DATA")
    this.props.store.kommuneSelectedName = this.props.match.params.kommune
    console.log(this.props.store.kommuneSelectedName)
    this.GetNamesKommune()
    this.GetData()
  },
  SetSelectedName(val){
    console.log(val)
    this.props.store.kommuneSelectedName = val
    this.props.history.push('/oversikt/'+this.props.store.kommuneSelectedName)
    this.GetData()
  },
  GetNamesKommune(){
    var that=this;
    var request = new Request(this.props.store.baseURL+"namesKommune?xname=All", {
      method: 'GET', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request)
      .then(function(response){
        if(response.ok) {
          return response.json()
        }
        throw new Error('Bad kommune.');
      })
      .then((response) => this.setState({
        namesKommune: JSON.parse(response).map(function(item){
          return { 'location': item.location, 'locationName': item.locationName+' \['+item.location.substr(item.location.length - 4)+'\]'}
        })}));
  },
  GetData(){
    console.log(this.props.store.kommuneSelectedName)
    this.setState({ data: null })
    var that = this
    var request = new Request(sprintf(this.props.store.baseURL+'v1_0_DataWeeklyOverviewKommune?xname=%s', this.props.store.kommuneSelectedName), {
      method: 'GET', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request)
      .then(function(response){
        if(response.ok) {
          return response.json()
        }
        throw new Error('Bad kommune.');
      })
      .then((response) => this.setState({
        data: JSON.parse(response)
      }, function(){
        console.log(this.state.data)
      }))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });


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
        namesKommune = {this.state.namesKommune}
        data = {this.state.data}
        getNamesKommune={this.props.store.baseURL+"namesKommune?name=All"}
        getData={this.props.store.baseURL+"v1_0_DataWeeklyOverviewKommune"}/>)}
      </FullWidthSelection>

    );
  }
})))

export default App


//export default App;

