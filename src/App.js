import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';

import DashboardFylke from './DashboardFylke.js';
import DashboardKommune from './DashboardKommune.js';
import DashboardWeek from './DashboardWeek.js';
import DashboardHelp from './DashboardHelp.js';
//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'overview',
      baseURL: 'null'
    };
    this.handleSelect = this.handleSelect.bind(this)
    this.determineBaseURL = this.determineBaseURL.bind(this)
  }

  handleSelect(event, eventKey){
    console.log(event);
    this.setState( { tab: event } );
  }

  determineBaseURL() {
    var urls = [
      "http://sykdomspulsen.fhi.no:8000/",
      "http://linux.fhi.no/api/",
      "http://localhost:10001/api/"
    ]
    var check = "namesFylke"
    var setURL=false
    for(var i=0; i<urls.length; i++){
      var request = new Request(urls[i]+"test?x="+i, {
      method: 'GET', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
     });
     // Now use it!
     console.log(i)
     fetch(request)
        .then((responseText) => responseText.json())
        .then((response) => {
          var workingURL = urls[JSON.parse(response)]
         console.log("PASS")
         if(!setURL){
           this.setState({baseURL:workingURL})
           setURL=true
         }
        })
       .catch(function(err){console.log("FAIL: "+err)});
    }
  }

  componentWillMount(){

    this.determineBaseURL()
  }

  render(){

    return(
<ThemeSwitcher themePath='/themes' defaultTheme='united'>
<div>
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Sykdomspulsen</a>
      </Navbar.Brand>
    <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={"overview"} href="#" onSelect={this.handleSelect}>Oversikt</NavItem>
        <NavItem eventKey={"signals"} href="#" onSelect={this.handleSelect}>Signaler</NavItem>
        <NavDropdown eventKey={"x"} title="Antall" id="basic-nav-dropdown" onSelect={this.handleSelect}>
          <MenuItem eventKey={"weekly"}>Ukentlig</MenuItem>
          <MenuItem eventKey={"daily"}>Daglig</MenuItem>
        </NavDropdown>
        <NavItem eventKey={"help"} href="#" onSelect={this.handleSelect}>Hjelp/Om Sykdomspulsen</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
      { this.state.baseURL!="null" && this.state.tab === "overview" ? <DashboardFylke type={"Barometer"} getData={this.state.baseURL+"v1_0_DataWeeklyOverview"} getNamesFylke={this.state.baseURL+"namesFylke"}/> : null }
      { this.state.tab === "signals" ? <DashboardWeek getData={this.state.baseURL+"v1_0_DataWeeklySignal"} getNamesWeek={this.state.baseURL+"v1_0_WeeksWeeklySignal"}/> : null }
      { this.state.tab === "weekly" ? <DashboardKommune type={"Lines"} getData={this.state.baseURL+"v1_0_DataWeeklyLine"} getNamesFylke={this.state.baseURL+"namesFylke"} getNamesKommune={this.state.baseURL+"namesKommune"}/> : null }
      { this.state.tab === "daily" ? <DashboardFylke type={"Lines"} getData={this.state.baseURL+"v1_0_DataDailyLine"} getNamesFylke={this.state.baseURL+"namesFylke"}/> : null }
      { this.state.tab === "help" ? <DashboardHelp /> : null }
<img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} role={'presentation'}/>
<div className="App-footer">
</div>
</div>
</ThemeSwitcher>
    );
  }
}

export default App;

//export default App;

