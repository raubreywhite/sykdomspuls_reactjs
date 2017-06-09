import React, { Component } from 'react';
import {IndexLink, Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import FullWidthSelection from './FullWidthSelection.js';

import {deepOrange500, blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {styles} from './Styles'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    
  },
  appBar: {
    zIndex: 5,
    align: 'left',
  },
  drawer: {
    zIndex:0
  },
});

var App = inject("store")(observer(React.createClass({
getInitialState() {
  return {
    open: false
  };
},
handleToggle(){
  console.log("OK")
  this.setState({open: !this.state.open})
},
render(){

  return(
  <MuiThemeProvider muiTheme={muiTheme} >
  <div>
    <AppBar style={styles.appBar} titleStyle={styles.headerTitleInverse} title="Sykdomspulsen" onClick={this.handleToggle} iconElementLeft={this.state.open? <IconButton><NavigationClose /></IconButton> : <IconButton><NavigationMenu /></IconButton> } />
    <Drawer style={styles.drawer} open={this.state.open}>
    <AppBar style={styles.appBar} onClick={this.handleToggle} iconElementLeft={<IconButton><NavigationClose/></IconButton>}></AppBar>
    
    <MenuItem style={styles.menuItemTop} primaryText="Nyheter" linkButton={true} containerElement={<IndexLink to="/" />} />
    <MenuItem style={styles.menuItem} primaryText="Kommune" linkButton={true} containerElement={<Link to="kommune" />} />
    <MenuItem style={styles.menuItem} primaryText="Oversikt" linkButton={true} containerElement={<Link to="oversikt" />} />
    <MenuItem style={styles.menuItem} primaryText="Signaler" linkButton={true} containerElement={<Link to="signaler" />} />
    <MenuItem style={styles.menuItem} primaryText="Ukentlig" linkButton={true} containerElement={<Link to="ukentlig" />} />
    <MenuItem style={styles.menuItem} primaryText="Daglig" linkButton={true} containerElement={<Link to="daglig" />} />
    <MenuItem style={styles.menuItem} primaryText="Hjelp" linkButton={true} containerElement={<Link to="hjelp" />} />
    </Drawer>
    
    {this.props.children}
    
    <footer style={styles.footer}>
    
    <img src='sykdomspulsen.svg' width={"150"} role={'presentation'}/>
    <img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} role={'presentation'}/>
    
    </footer>
  </div>
  </MuiThemeProvider>
  );
}
})))

export default App

//export default App;

