import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {styles} from './Styles'

import injectTapEventPlugin from 'react-tap-event-plugin';

import News from './Page_News.js';
import Kommune from './Page_Kommune.js';
import Overview from './Page_Overview.js';
import Signals from './Page_Signals.js';
import Weekly from './Page_Weekly.js';
import Daily from './Page_Daily.js';
import DashboardHelp from './Page_Help.js';

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
  
      <Switch>
        <Route exact path="/" component={News}/>
        <Route exact path="/kommune" component={Kommune}/>
        <Route exact path="/oversikt" component={Overview}/>
        <Route exact path="/signaler" component={Signals}/>
        <Route exact path="/ukentlig" component={Weekly}/>
        <Route exact path="/daglig" component={Daily}/>
        <Route exact path="/hjelp" component={DashboardHelp}/>
      </Switch>
      
      
    <AppBar style={styles.appBar} titleStyle={styles.headerTitleInverse} title="Sykdomspulsen" onClick={this.handleToggle} iconElementLeft={this.state.open? <IconButton><NavigationClose /></IconButton> : <IconButton><NavigationMenu /></IconButton> } />
    <Drawer style={styles.drawer} open={this.state.open}>
    <AppBar style={styles.appBar} onClick={this.handleToggle} iconElementLeft={<IconButton><NavigationClose/></IconButton>}></AppBar>
    
    <MenuItem style={styles.menuItemTop} primaryText="Nyheter" containerElement={<Link to="/" />} onClick={this.handleToggle} />
    <MenuItem style={styles.menuItem} primaryText="Kommune" containerElement={<Link to="/kommune" />} onClick={this.handleToggle} />
    <MenuItem style={styles.menuItem} primaryText="Ukentlig" containerElement={<Link to="/ukentlig" />} onClick={this.handleToggle} />
    <MenuItem style={styles.menuItem} primaryText="Daglig" containerElement={<Link to="/daglig" />} onClick={this.handleToggle} />
    <MenuItem style={styles.menuItem} primaryText="Oversikt" containerElement={<Link to="/oversikt" />} onClick={this.handleToggle} />
    <MenuItem style={styles.menuItem} primaryText="Hjelp" containerElement={<Link to="/hjelp" />}  onClick={this.handleToggle} />
    </Drawer>
    
    {this.props.children}
    
    <footer style={styles.footer}>
    
    <img src='sykdomspulsen.svg' width={"150"} alt={'presentation'}/>
    <img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} alt={'presentation'}/>
    
    </footer>
  </div>
  </MuiThemeProvider>
  );
}
})))

export default App

//export default App;

