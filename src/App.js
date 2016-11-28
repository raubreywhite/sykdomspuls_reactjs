import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
var format = require( 'string-kit').format;
const Plotly = require('react-plotlyjs');

var LeftSelect = React.createClass ({
  handleChange : function(event){
//    event.stopPropagation()
    console.log(event.target.value) 
    this.props.onUpdate(event.target.value)
  },

  render : function() {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
          {this.props.list.map(function(listValue){
            return <option>{listValue}</option>;
          })}
        </FormControl>
      </FormGroup>
    )
  }
});

class RightGraph extends Component {
 render() {
    let layout = {                     // all "layout" attributes: #layout
      title: 'simple example',  // more about "layout.title": #layout-title
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
      namesFylke: [1,2],
      selectedName: "Norge",
      data : []
    };
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
  }

  GetData(){
    var request = new Request(format('http://localhost/prod/api/dataWeeklyFylke?name=%s', this.state.selectedName), {
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
    var request = new Request('http://localhost/prod/api/namesFylke', {
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
      .then((response) => this.setState({ namesFylke: response }));
  }

  GetResults() {
    this.setState({ namesFylke: [3,4] });
  }

  onUpdateSelectFylke(val){
    console.log('parent')
    console.log(val)
    this.setState({ selectedName: val }, function(){
      this.GetData()
    })
//    console.log(this.state.selectedName)
//    this.GetData()
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

    return(
      <div style={styleWrap}>
      <div style={styleSidebar}><LeftSelect onUpdate={this.onUpdateSelectFylke} list={this.state.namesFylke} /></div>
      <div style={styleMain}><RightGraph data={this.state.data} /></div>
      </div>
    );
  }
}

export default App;

//export default App;

