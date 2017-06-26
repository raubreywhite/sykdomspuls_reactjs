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
Dersom ruten for en gitt uke er farget med grønn farge betyr det at antall konsultasjoner i den gitte kommunen er som forventet denne uken. En gul farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er høyere enn forventet denne uken. En rød farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er betydelig høyere enn forventet denne uken. Fargene er laget ut fra beregninger fra de foregående 5 årene i fylke eller kommunen.
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
    this.props.history.push('/kommune/'+this.props.store.kommuneSelectedName)
    this.GetData()
  },
  GetNamesKommune(){
    var that=this;
    var request = new Request(this.props.store.baseURL+"namesKommune?name=All", {
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
    var request = new Request(sprintf(this.props.store.baseURL+'v1_0_DataWeeklyOverviewKommune?name=%s', this.props.store.kommuneSelectedName), {
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

