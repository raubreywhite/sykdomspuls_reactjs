import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
import {IndexLink, Link } from 'react-router';
import * as baseURLActions from './actions/baseURL.actions.js';

//import { SideNav, Nav } from 'react-sidenav';
//import { Plotly } from 'react-plotlyjs';
//var format = require( 'string-kit').format;


class App extends Component {

  render(){

    return(
<div>
<header>
<div className="container">
<div className="txt-center">
<h1 className="column12">Sykdomspulsen</h1>
<nav className="column12 nav nav-small">
<IndexLink to="/" activeClassName="cl-teal">Oversikt</IndexLink>
<Link to="signaler" activeClassName="cl-teal">Signaler</Link>
<Link to="ukentlig" activeClassName="cl-teal">Ukentlig</Link>
<Link to="daglig" activeClassName="cl-teal">Daglig</Link>
<Link to="hjelp" activeClassName="cl-teal">Hjelp</Link>
</nav>
</div>
</div>
</header>

{this.props.children}

<footer>
<div className="container txt-center">
<div className="column12">
<img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} role={'presentation'}/>
</div>
</div>
</footer>
</div>
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

