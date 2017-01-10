import React, { Component } from 'react';
	import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
import Overview from './Overview.js';
import Weekly from './Weekly.js';

//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'overview'
    };
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event, eventKey){
    console.log(event);
    this.setState( { tab: event } );
  }

  render(){


var styleFooter = {
    height: '5px',
    background: '#d34615',
    opacity: 1
};
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
        <NavDropdown eventKey={"x"} title="Terskelen" id="basic-nav-dropdown" onSelect={this.handleSelect}>
          <MenuItem eventKey={"weekly"}>Ukentlig</MenuItem>
          <MenuItem eventKey={"daily"}>Daglig</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
      { this.state.tab === "overview" ? <Overview/> : null }
      { this.state.tab === "weekly" ? <Weekly/> : null }
<img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} role={'presentation'}/>
<div style={styleFooter}>
</div>
</div>
</ThemeSwitcher>
    );
  }
}

export default App;

//export default App;

