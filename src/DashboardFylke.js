import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Measure from 'react-measure';
require('rc-slider/assets/index.css');
import Slider from 'rc-slider';
var d3=require('d3');
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

import Barometer from './Barometer.js'
import Lines from './Lines.js'

var sprintf = require("sprintf-js").sprintf

var LeftSelect = React.createClass ({
  handleChangeType : function(event){
    this.props.onUpdateType(event.target.value)
  },
  handleChangeAge : function(event){
    this.props.onUpdateAge(event.target.value)
  },
  handleChangeFylke : function(event){
    this.props.onUpdateFylke(event.target.value)
  },

  render : function() {
    return (
      <FormGroup controlId="formControlsSelect" bsSize="small">
        <ControlLabel>Sykdom/Symptom</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeType}>
          {this.props.listType.map(function(listValue, i){
            return <option key={i} value={listValue["value"]}>{listValue["name"]}</option>;
          })}
        </FormControl>
        <br/>
        <ControlLabel>Alder</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeAge}>
          {this.props.listAge.map(function(listValue, i){
            return <option key={i} value={listValue["value"]}>{listValue["name"]}</option>;
          })}
        </FormControl>
        <br/>
        <ControlLabel>Fylke</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeFylke}>
          {this.props.listFylke.map(function(listValue, i){
            return <option key={i} value={listValue["location"]}>{listValue["locationName"]}</option>;
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
      namesAge: [
        {'value':'Totalt','name':'Totalt'},
        {'value':'0-4','name':'0-4'},
        {'value':'5-14','name':'5-14'},
        {'value':'15-19','name':'15-19'},
        {'value':'20-29','name':'20-29'},
        {'value':'30-64','name':'30-64'},
        {'value':'65p','name':'65+'}
        ],
      namesFylke: [1,2],
      selectedType: 'respiratory',
      selectedAge: 'Totalt',
      selectedName: "Norge",
      selectedPrettyName: "Norge",
      data : [],
      brushValues: [0,10000],
      dimensions: {
        width: 800,
        height: 400
      }
    };
    this.onUpdateSelectType = this.onUpdateSelectType.bind(this)
    this.onUpdateSelectAge = this.onUpdateSelectAge.bind(this)
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
    this.tipFormatter = this.tipFormatter.bind(this)
    this.setBrushValues = this.setBrushValues.bind(this)
  }

  GetData(){
    var request = new Request(sprintf(this.props.getData+'?type=%s&age=%s&name=%s',this.state.selectedType,this.state.selectedAge, this.state.selectedName), {
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
    var request = new Request(this.props.getNamesFylke, {
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

  onUpdateSelectAge(val){
    this.setState({selectedAge: val}, function(){
      this.GetData()
    })
  }

  onUpdateSelectFylke(val){
    var selectedPrettyName = this.state.namesFylke.filter(function(el) {
      return el['location']===val
    })[0]['locationName']
    this.setState(
      {
        selectedName: val,
        selectedFylke: val,
        selectedPrettyName: selectedPrettyName
      },
      function(){
        this.GetData()
      }
    )
  }

  componentDidMount(){
    this.GetNamesFylke()
    this.GetData()
  }

tipFormatter(val){
    if(this.state.data['data'] == null){
  return(val)
} else {
  return(this.state.data.labs[val-1].label)
}
}

setBrushValues(val){
  this.setState({brushValues:val})
}

  render(){

var styleWrap = {
    margin: '0px',
    padding: '0px',
    paddingRight: '240px',
    background: '#fff',
    overflow: 'hidden'
};

var styleMain = {
    margin: '0 -220px 0 auto',
    width: '100%',
    float: 'right',
    background: '#fff',
    minHeight: '100px',
    paddingBottom: '25px'
};

var styleSidebar = {
    paddingLeft: '20px',
    paddingTop: '55px',
    width: '200px',
    float: 'left',
    height: '200px',
    background: '#fff',
    minHeight: '100px'
};

var styleBrush = {
    paddingLeft: '125px',
    paddingRight: '90px'
}

var xMin=1
var xMax=10000
var marks= {1: ' '}
    if(this.state.data['data'] == null){
    } else {
xMin=d3.min(this.state.data.data.map(function(item){ return item.xRaw }))
xMax=d3.max(this.state.data.data.map(function(item){ return item.xRaw }))

    var howFrequent=26
    var freeSpace = this.state.dimensions.width/(xMax-xMin+1)
    console.log(freeSpace)
    if(freeSpace <=2){
      howFrequent='lab7'
    } else if(freeSpace <= 4){
      howFrequent='lab6'
    } else {
      howFrequent='lab5'
    }

    var ticks = d3.set(this.state.data.labs.map(function(item) {
      if(item[howFrequent] === 1){
        return item.xRaw;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});
  marks ={} 
  for(var i=0; i < ticks.length; i++){
    marks[ticks[i]] = this.tipFormatter(ticks[i])
    }
}
var defaultValue=[xMin,xMax]


    return(
      <div style={styleWrap}>
        <div style={styleSidebar}><LeftSelect onUpdateType={this.onUpdateSelectType} listType={this.state.namesType} listAge={this.state.namesAge} onUpdateAge={this.onUpdateSelectAge} onUpdateFylke={this.onUpdateSelectFylke} listFylke={this.state.namesFylke}/></div>
        <Measure onMeasure={(dimensions) => { this.setState({dimensions})}}>
          <div style={styleMain}>
            <h3>{this.state.selectedPrettyName}</h3>
      { this.props.type === "Barometer" ? <Barometer data={this.state.data} brushValues={this.state.brushValues} width={this.state.dimensions.width}/> : null }
      { this.props.type === "Lines" ? <Lines data={this.state.data} brushValues={this.state.brushValues} width={this.state.dimensions.width}/> : null }
            <div style={styleBrush}>
            <Slider min={xMin} max={xMax} defaultValue={defaultValue} range={true} tipFormatter={this.tipFormatter} marks={marks} onAfterChange={this.setBrushValues}/>
            </div>
          </div>
        </Measure>
      </div>
    );
  }
}

export default App;

//export default App;

