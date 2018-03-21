import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'mobx-react';
import { toJS } from 'mobx';



//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';



import { HashRouter, Route } from 'react-router-dom'

import {store} from './store'

const stores = {store}

function FinalRender(){
    console.log("FINAL RENDER")
    ReactDOM.render((
      <Provider {...stores}>
        <HashRouter>
          <Route path="/" component={App} />
        </HashRouter>
      </Provider>
    ), document.getElementById('root'));

}

async function GetNamesTypesAndNamesFylke(url) {
    var request1 = new Request(url+'v1_0_NamesTypes', {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });

    var request2 = new Request(url+stores.store.urlWeeklyGetNamesFylke, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });

console.log(url)
    let response1 = await fetch(request1)
    let data1 = await response1.json()

    let response2 = await fetch(request2)
    let data2 = await response2.json()

    stores.store.namesType = JSON.parse(data1)
    stores.store.namesFylke = JSON.parse(data2)

    console.log("GetNamesTypesAndNamesFylke")
    return 1
}

async function requestAsync(url) {
    try {
        let response = await fetch(url+'test?x=0')
        if (!response.ok) // or check for response.status
            throw new Error(response.statusText);
        let body = await response.text(); // or .json() or whatever
        // process body
        return url
    } catch (err) {
        console.log(err)
    }
}

var urls = ["http://localhost:8000/","http://sykdomspulsen.fhi.no/api/"]
Promise.all(urls.map(url => requestAsync(url)))
    .then(function(allData) {
        return allData.filter(function(n){ return n != undefined })
    })
    .then((workingURLs) => {
        console.log(workingURLs)
        stores.store.baseURL = workingURLs[0]
        return workingURLs[0]
    })
    .then((url) => GetNamesTypesAndNamesFylke(url))
    .then((result) => {
        console.log(1)
        console.log(toJS(stores.store.namesType))
        console.log(toJS(stores.store.namesFylke))
    })
    .then((result) => {
        FinalRender()
    })


