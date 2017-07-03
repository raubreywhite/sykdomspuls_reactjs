import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import renderIf from 'render-if'

import {blue500, blue400, blue300, blue200, blue100, grey900} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';

import {muiTheme} from './Styles'

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
  
      
    <AppBar style={muiTheme.appBar} titleStyle={muiTheme.headerTitleInverse} title="Kommunehelsetjenesten" onClick={this.handleToggle} iconElementLeft={this.state.open? <IconButton><NavigationClose /></IconButton> : <IconButton><NavigationMenu /></IconButton> } />
    <Drawer style={muiTheme.drawer} open={this.state.open}>
    <AppBar style={muiTheme.appBar} onClick={this.handleToggle} iconElementLeft={<IconButton><NavigationClose/></IconButton>}></AppBar>
    
    <MenuItem style={muiTheme.menuItemTop} primaryText="Nyheter" containerElement={<Link to="/" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Oversikt" containerElement={<Link to={"/oversikt/"+this.props.store.kommuneSelectedName} />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Ukentlig" containerElement={<Link to="/ukentlig" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Daglig" containerElement={<Link to="/daglig" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Hjelp" containerElement={<Link to="/hjelp" />}  onClick={this.handleToggle} />
    </Drawer>
    
    {renderIf(this.props.store.baseURL!="null")(
      <Switch>
        <Route exact path="/" component={News}/>
        <Route path="/oversikt/:kommune" component={Kommune}/>
        <Route exact path="/signaler" component={Signals}/>
        <Route exact path="/ukentlig" component={Weekly}/>
        <Route exact path="/daglig" component={Daily}/>
        <Route exact path="/hjelp" component={DashboardHelp}/>
      </Switch>
    )}
    
    
    <footer style={muiTheme.footer}>
    
    
    <img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} alt={'presentation'}/>
    
    </footer>
  </div>
  </MuiThemeProvider>
  );
}
})))

export default App

//export default App;

