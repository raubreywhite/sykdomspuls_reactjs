import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

import Lines from './Lines.js'

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
  handleChangeKommune: function(event){
    this.props.onUpdateKommune(event.target.value)
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
        <ControlLabel>Kommune</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeKommune}>
          {this.props.listKommune.map(function(listValue){
            return <option value={listValue["location"]}>{listValue["locationName"]}</option>;
          })}
        </FormControl>
      </FormGroup>
    )
  }
});

class RightGraph extends Component {
 render() {
    let layout = {                     // all "layout" attributes: #layout
      title: this.props.title,  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
      },
      annotations: [            // all "annotation" attributes: #layout-annotations
        {
          text: 'simple annotation',    // #layout-annotations-text
          x: 0,                         // #layout-annotations-x
          xref: 'paper',                // #layout-annotations-xref
          y: 0,                         // #layout-annotations-y
          yref: 'paper'                 // #layout-annotations-yref
        }
      ],
      legend: {'orientation':'h'}
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (
      <Plotly className="whatever" data={this.props.data} layout={layout} config={config}/>
    );
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namesType: [{'value':'respiratory','name':'Øvre-luftvei diagnose'},{'value':'gastro','name':'Mage-tarm diagnose'}],
      namesFylke: [1,2],
      namesKommune: [1,2],
      selectedType: 'respiratory',
      selectedFylke: "Norge",
      selectedName: "Norge",
      data : []
    };
    this.onUpdateSelectType = this.onUpdateSelectType.bind(this)
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
    this.onUpdateSelectKommune = this.onUpdateSelectKommune.bind(this)
  }

  GetData(){
    var request = new Request(sprintf('http://linux.fhi.no/api/v1_0_DataWeeklyLine?name=%s&type=%s', this.state.selectedName, this.state.selectedType), {
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

  GetNamesKommune(){
    var request = new Request(sprintf('http://linux.fhi.no/api/namesKommune?name=%s', this.state.selectedFylke), {
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
      .then((response) => this.setState({ namesKommune: JSON.parse(response) }));
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
      this.GetNamesKommune()
      this.GetData()
    })
  }

  onUpdateSelectKommune(val){
    console.log('parent')
    console.log(val)
    this.setState({ selectedName: val }, function(){
      this.GetData()
    })
  }

  componentDidMount(){
    this.GetNamesFylke()
    this.GetNamesKommune()
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
      <div style={styleSidebar}><LeftSelect onUpdateType={this.onUpdateSelectType} listType={this.state.namesType} onUpdateFylke={this.onUpdateSelectFylke} listFylke={this.state.namesFylke} onUpdateKommune={this.onUpdateSelectKommune} listKommune={this.state.namesKommune}/></div>
      <div style={styleMain}><Lines data={this.state.data} /></div>
      </div>
    );
  }
}

export default App;

//export default App;

