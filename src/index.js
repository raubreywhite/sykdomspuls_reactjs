import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'mobx-react';

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

import News from './Page_News.js';
import Kommune from './Page_Kommune.js';
import Overview from './Page_Overview.js';
import Signals from './Page_Signals.js';
import Weekly from './Page_Weekly.js';
import Daily from './Page_Daily.js';
import DashboardHelp from './Page_Help.js';

import {Router, Route, IndexRoute, hashHistory } from 'react-router'

import {store} from './store'

const stores = {store}

function  determineBaseURL() {
  var urls = ["http://localhost:10001/api/","http://"+window.location.host+"/api/","http://sykdomspulsen.fhi.no/api/"]
  console.log(urls)
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
          stores.store.baseURL = workingURL
          setURL=true
        }
      })
      .catch(function(err){console.log("FAIL: "+err)});
  }
}

determineBaseURL()

ReactDOM.render((
  <Provider {...stores}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={News}/>
        <Route path="kommune" component={Kommune}/>
        <Route path="oversikt" component={Overview}/>
        <Route path="signaler" component={Signals}/>
        <Route path="ukentlig" component={Weekly}/>
        <Route path="daglig" component={Daily}/>
        <Route path="hjelp" component={DashboardHelp}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

/*
ReactDOM.render(
  <App2 />,
  document.getElementById('root2')
);

*/
