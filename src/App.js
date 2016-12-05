import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

var sprintf = require("sprintf-js").sprintf
const Plotly = require('react-plotlyjs');

var LeftSelect = React.createClass ({
  handleChangeFylke : function(event){
//    event.stopPropagation()
    console.log(event.target.value) 
    this.props.onUpdateFylke(event.target.value)
  },
  handleChangeKommune: function(event){
    this.props.onUpdateKommune(event.target.value)
  },

  render : function() {
    return (
      <FormGroup controlId="formControlsSelect">
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
        title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [            // all "annotation" attributes: #layout-annotations
        {
          text: 'simple annotation',    // #layout-annotations-text
          x: 0,                         // #layout-annotations-x
          xref: 'paper',                // #layout-annotations-xref
          y: 0,                         // #layout-annotations-y
          yref: 'paper'                 // #layout-annotations-yref
        }
      ]
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
      type: [{'value':'respiratory','name':'Øvre-luftvei diagnose'},{'value':'gastro','name':'Mage-tarm diagnose'}],
      namesFylke: [1,2],
      namesKommune: [1,2],
      selectedFylke: "Norge",
      selectedName: "Norge",
      data : []
    };
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
    this.onUpdateSelectKommune = this.onUpdateSelectKommune.bind(this)
  }

  GetData(){
    var request = new Request(sprintf('http://172.30.39.176/prod/api/dataWeeklyFylke?name=%s', this.state.selectedName), {
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
    var request = new Request('http://172.30.39.176/prod/api/namesFylke', {
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
    var request = new Request(sprintf('http://172.30.39.176/prod/api/namesKommune?name=%s', this.state.selectedFylke), {
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

    return(
      <div style={styleWrap}>
      <div style={styleSidebar}><LeftSelect onUpdateFylke={this.onUpdateSelectFylke} listFylke={this.state.namesFylke} onUpdateKommune={this.onUpdateSelectKommune} listKommune={this.state.namesKommune}/></div>
      <div style={styleMain}><RightGraph title={this.state.selectedName} data={this.state.data} /></div>
      </div>
    );
  }
}

export default App;

//export default App;

