import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Measure from 'react-measure';
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

import Barometer from './Barometer.js'

var sprintf = require("sprintf-js").sprintf
const Plotly = require('react-plotlyjs');

var LeftSelect = React.createClass ({
  handleChangeType : function(event){
    this.props.onUpdateType(event.target.value)
  },
  handleChangeFylke : function(event){
    console.log(event.target.value) 
    this.props.onUpdateFylke(event.target.value)
  },

  render : function() {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Sykdom/Symptom</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeType}>
          {this.props.listType.map(function(listValue){
            return <option value={listValue["value"]}>{listValue["name"]}</option>;
          })}
        </FormControl>
        <ControlLabel>Fylke</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeFylke}>
          {this.props.listFylke.map(function(listValue){
            return <option value={listValue["location"]}>{listValue["locationName"]}</option>;
          })}
        </FormControl>
      </FormGroup>
    )
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namesType: [{'value':'respiratory','name':'Øvre-luftvei diagnose'},{'value':'gastro','name':'Mage-tarm diagnose'}],
      namesFylke: [1,2],
      selectedType: 'respiratory',
      selectedName: "Norge",
      data : [],
      dimensions: {
        width: 800,
        height: 400
      }
    };
    this.onUpdateSelectType = this.onUpdateSelectType.bind(this)
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
  }

  GetData(){
    var request = new Request(sprintf('http://linux.fhi.no/api/v1_0_DataWeeklyOverview?name=%s&type=%s', this.state.selectedName, this.state.selectedType), {
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
      .then((response) => this.setState({ data: JSON.parse(response) }));
  }

  GetNamesFylke(){
    var request = new Request('http://linux.fhi.no/api/namesFylke', {
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
      .then((response) => this.setState({ namesFylke: JSON.parse(response) }));
  }

  GetResults() {
    this.setState({ namesFylke: [3,4] });
  }

  onUpdateSelectType(val){
    this.setState({selectedType: val}, function(){
      this.GetData()
    })
  }

  onUpdateSelectFylke(val){
    console.log('parent')
    console.log(val)
    this.setState({ selectedName: val, selectedFylke: val }, function(){
      this.GetData()
    })
  }

  componentDidMount(){
    this.GetNamesFylke()
    this.GetData()
  }

  render(){

var styleWrap = {
    margin: '20px',
    padding: '20px',
    paddingRight: '240px',
    background: '#fff',
    overflow: 'hidden'
};

var styleMain = {
    margin: '0 -220px 0 auto',
    width: '100%',
    float: 'right',
    background: '#eee',
    minHeight: '100px'
};

var styleSidebar = {
    width: '200px',
    float: 'left',
    height: '200px',
    background: '#eee',
    minHeight: '100px'
};

var fakeData = [
{ 'date': '2-May-12', 'close': 582 },
{ 'date': '1-May-12', 'close': 582 },
{ 'date': '30-Apr-12', 'close': 500 }
];
    return(
      <div style={styleWrap}>
        <div style={styleSidebar}><LeftSelect onUpdateType={this.onUpdateSelectType} listType={this.state.namesType} onUpdateFylke={this.onUpdateSelectFylke} listFylke={this.state.namesFylke}/></div>
        <Measure onMeasure={(dimensions) => { this.setState({dimensions})}}>
          <div style={styleMain}>
            <Barometer data={this.state.data} width={this.state.dimensions.width}/>
          </div>
        </Measure>
      </div>
    );
  }
}

export default App;

//export default App;

