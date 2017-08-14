import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'mobx-react';



//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';



import { HashRouter, Route } from 'react-router-dom'

import {store} from './store'

const stores = {store}

function  determineBaseURL() {
  var urls = ["http://localhost:8000/","http://"+window.location.host+"/api/","http://sykdomspulsen.fhi.no/api/"]
  var urls = ["http://"+window.location.host+"/api/","http://sykdomspulsen.fhi.no/api/"]
  var urls = ["http://sykdomspulsen.fhi.no/api/"]
  console.log(urls)
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
        if(!setURL){
          stores.store.baseURL = workingURL
          setURL=true
          console.log("PASS "+workingURL)
        }
      })
      .catch(function(err){console.log("FAIL: "+err)});
  }
}

determineBaseURL()

ReactDOM.render((
  <Provider {...stores}>
    <HashRouter>
      <Route path="/" component={App} />
    </HashRouter>
  </Provider>
), document.getElementById('root'));

/*
ReactDOM.render(
  <App2 />,
  document.getElementById('root2')
);

*/
