import React, { Component } from 'react';
	import { FormGroup, ControlLabel, FormControl, Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import Overview from './Overview.js';
import Weekly from './Weekly.js';

//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;

var sprintf = require("sprintf-js").sprintf
const Plotly = require('react-plotlyjs');

class App extends Component {
  render(){

    return(
<div>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Sykdomspulsen</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Oversikt</NavItem>
        <NavDropdown eventKey={3} title="Terskelen" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Ukentlig</MenuItem>
          <MenuItem eventKey={3.2}>Daglig</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
      <Overview/>
</div>
    );
  }
}

export default App;

//export default App;

