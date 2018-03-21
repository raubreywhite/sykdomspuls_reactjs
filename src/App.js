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

import {muiTheme} from './Styles'

import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from './Page_Home.js';
import News from './Page_News.js';
import Overview from './Page_Overview.js';
//import Overview from './Page_Overview.js';
//import Signals from './Page_Signals.js';
import Weekly from './Page_Weekly.js';
import Daily from './Page_Daily.js';
import DashboardHelp from './Page_Help.js';
import About from './Page_About.js';

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

  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  return(
  <div>
  {renderIf(isIE===true)(
    <div>
    <h2>Sykdomspulsen til kommunehelsetjenesten</h2>
    <h2>Du har nå prøvd å logge inn på Sykdomspulsen til kommunehelsetjenesten ved å bruke Internet Explorer</h2>
    <h2>Denne websiden virker ikke når du bruker Internet Explorer</h2>
    <h2>Du må derfor laste ned en mer moderne nettleser som for eksempel Google Chrome</h2>
    <h2>Ta kontakt med oss på e-post sykdomspulsen@fhi.no dersom du har problemer</h2>
    </div>
  )}
  {renderIf(isIE===false)(
  <MuiThemeProvider muiTheme={muiTheme} >
  <div>


    <AppBar style={muiTheme.appBar} titleStyle={muiTheme.headerTitleInverse} title="Sykdomspulsen" onClick={this.handleToggle} iconElementLeft={this.state.open? <IconButton><NavigationClose /></IconButton> : <IconButton><NavigationMenu /></IconButton> } />
    <Drawer style={muiTheme.drawer} open={this.state.open}>
    <AppBar style={muiTheme.appBar} onClick={this.handleToggle} iconElementLeft={<IconButton><NavigationClose/></IconButton>}></AppBar>

    <MenuItem style={muiTheme.menuItemTop} primaryText="Hjem" containerElement={<Link to="/" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Nyheter" containerElement={<Link to="/nyheter" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Oversikt" containerElement={<Link to={"/oversikt/"+this.props.store.kommuneSelectedName} />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Ukentlig" containerElement={<Link to={"/ukentlig/"+this.props.store.weekSelectedFylke+"/"+this.props.store.weekSelectedName+"/"+this.props.store.weekSelectedType+"/"+this.props.store.weekSelectedAge} />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Daglig" containerElement={<Link to="/daglig" />} onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Hjelp" containerElement={<Link to="/hjelp" />}  onClick={this.handleToggle} />
    <MenuItem style={muiTheme.menuItem} primaryText="Om Sykdomspulsen" containerElement={<Link to="/om" />}  onClick={this.handleToggle} />
    </Drawer>

    {renderIf(this.props.store.baseURL!=="null")(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/nyheter" component={News}/>
        <Route path="/oversikt/:kommune" component={Overview}/>
        <Route path="/ukentlig/:selectedFylke/:selectedName/:selectedType/:selectedAge" component={Weekly}/>
        <Route exact path="/daglig" component={Daily}/>
        <Route exact path="/hjelp" component={DashboardHelp}/>
        <Route exact path="/om" component={About}/>
      </Switch>
    )}


    <footer style={muiTheme.footer}>


    <img src='https://www.fhi.no/Static/templates/build/gfx/logo.svg' width={"150"} alt={'presentation'}/>

    </footer>
  </div>
  </MuiThemeProvider>
  )}
  </div>
  );
}
})))

export default App

//export default App;

