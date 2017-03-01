import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
import * as baseURLActions from './actions/baseURL.actions.js';

//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;


class App extends Component {

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
        <NavItem href="/">Oversikt</NavItem>
        <NavItem href="/signaler">Signaler</NavItem>
        <NavDropdown title="Antall" id="basic-nav-dropdown">
          <MenuItem href="/ukentlig">Ukentlig</MenuItem>
          <MenuItem href="/daglig">Daglig</MenuItem>
        </NavDropdown>
        <NavItem  href="/hjelp">Hjelp/Om Sykdomspulsen</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

{this.props.children}

<img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} role={'presentation'}/>
<div className="App-footer">
</div>
</div>
</ThemeSwitcher>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    baseURL: state.baseURL
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
  setBaseURL: baseURLActions.setBaseURL
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

//export default App;

