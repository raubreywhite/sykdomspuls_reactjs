import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import sykdomspulsApp from './reducers';

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

import Overview from './Page_Overview.js';
import Signals from './Page_Signals.js';
import Weekly from './Page_Weekly.js';
import Daily from './Page_Daily.js';
import DashboardHelp from './DashboardHelp.js';

import {Router, Route, IndexRoute, browserHistory } from 'react-router'

let store = createStore(sykdomspulsApp)

store.dispatch({
  type: 'SET_BASE_URL',
  value: 'null'
});

function  determineBaseURL() {
    var urls = [
      "http://sykdomspulsen.fhi.no/api/",
      "http://sykdomspulsen-test.fhi.no/api/",
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
store.dispatch({
type: 'SET_BASE_URL',
value:workingURL
})
           setURL=true
         }
        })
       .catch(function(err){console.log("FAIL: "+err)});
    }
  }
      determineBaseURL()

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Overview}/>
            <Route path="/signaler" component={Signals}/>
            <Route path="/ukentlig" component={Weekly}/>
            <Route path="/daglig" component={Daily}/>
            <Route path="/hjelp" component={DashboardHelp}/>
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
