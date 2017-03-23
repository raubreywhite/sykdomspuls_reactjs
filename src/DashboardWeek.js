import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Measure from 'react-measure';
require('rc-slider/assets/index.css');
import Slider from 'rc-slider';
var d3=require('d3');
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

import Table from './Table.js'

var sprintf = require("sprintf-js").sprintf

var LeftSelect = React.createClass ({
  handleChangeWeek : function(event){
    this.props.onUpdateWeek(event.target.value)
  },
  handleChangeLevel : function(event){
    this.props.onUpdateLevel(event.target.value)
  },

  render : function() {
    return (
      <div>
        <select onChange={this.handleChangeWeek}>
          {this.props.listWeek.map(function(listValue, i){
            return <option key={i} value={listValue["value"]}>Uke {listValue["name"]}</option>;
          })}
        </select>
        <select onChange={this.handleChangeLevel}>
          {this.props.listLevel.map(function(listValue, i){
            return <option key={i} value={listValue["value"]}>{listValue["name"]}</option>;
          })}
        </select>
       </div>
    )
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namesWeek: [1,2],
      namesLevel: [
        {'value':'fylke','name':'Fylke nivå'},
        {'value':'kommune','name':'Kommune nivå'}
        ],
      selectedWeek: '1',
      selectedLevel: 'fylke',
      data : []
    };
    this.onUpdateSelectWeek = this.onUpdateSelectWeek.bind(this)
    this.onUpdateSelectLevel = this.onUpdateSelectLevel.bind(this)
  }

  GetData(){
    var request = new Request(sprintf(this.props.getData+'?xwkyr=%s&level=%s',this.state.selectedWeek,this.state.selectedLevel), {
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

  GetNamesWeek(){
    var request = new Request(this.props.getNamesWeek, {
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
      .then((response) => this.setState({
        namesWeek: JSON.parse(response),
        selectedWeek: JSON.parse(response)[0].value
       }, function(){
        this.GetData()
        }));
  }

  onUpdateSelectWeek(val){
    this.setState({
      selectedWeek: val
    }, function(){
      this.GetData()
console.log(this.state.data)
    })
  }

  onUpdateSelectLevel(val){
    this.setState({
      selectedLevel: val
    }, function(){
      this.GetData()
    })
  }

  componentDidMount(){
    this.GetNamesWeek()
  }

  render(){
    return(
      <div>
      <section id="usage">
      <div className="container">
      <div className="column10 prefix1 txt-center">
        <LeftSelect onUpdateWeek={this.onUpdateSelectWeek} listWeek={this.state.namesWeek} listLevel={this.state.namesLevel} onUpdateLevel={this.onUpdateSelectLevel} />
      </div>
      <br/>
      <br/>
      <div className="column12 txt-center">
        <Table data={this.state.data} />
      </div>
      </div>
      </section>
      </div>
    );
  }
}

export default App;

//export default App;

