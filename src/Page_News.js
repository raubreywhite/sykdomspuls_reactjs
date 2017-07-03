import React, { Component } from 'react';
import Measure from 'react-measure';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullWidthSelection from './FullWidthSelection.js';
import {muiTheme} from './Styles'

class App extends Component {

  render(){
    return(
<FullWidthSelection>
<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Økt antall konsultasjoner i aldersgruppen 15-19 år"
subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>Fra høsten 2016 ser vi en økning i antall konsultasjoner hos lege og legevakt for aldersgruppen 15-19 år. Dette har antakelig sammenheng med at det ble innført nye fraværsregler i den videregående skole fra skolestart høsten 2016.</p>
</CardText>
</Card>

<br/>

<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Pilotprosjektet Sykdomspulsen til kommunehelsetjenesten lanseres 15.08.2017"
subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>Sykdomspulsen til kommunehelsetjenesten er et pilotprosjekt som ble lansert 15.08.2017. I pilotprosjektet har utvalgte fylkes- og kommuneleger fått tilgang til denne websiden for å gi tilbakemelding om behov og brukervennlighet.</p>
<p>Gry M Grøneng er prosjektleder og Richard White er statistiker og webansvarlig. Hvis du har spørsmål eller ris/ros til websiden ta kontakt med oss på mailadresse: sykdomspulsen@fhi.no</p>
</CardText>
</Card>

</FullWidthSelection>
    );
  }
}

export default App;

//export default App;

